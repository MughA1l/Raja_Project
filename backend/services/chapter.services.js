
import getCloudinaryUrl from '../utils ( reusables )/ImageUpload.js';
import * as chapterRepo from '../repositories/chapter.repository.js'
import { addChapterToBook } from './book.services.js';
import ApiError from '../utils ( reusables )/ApiError.js';
import * as imageRepo from '../repositories/image.repository.js'
// book repository function
import { findBookById } from '../repositories/book.repository.js';
import { imageQueue } from './bull-MQ/producer.js';

export const createChapter = async ({
    userId,
    name,
    bookId,
    isMids,
    imageFile,          // cover image (cloudinary)
    imageFilesArray,    // chapter images (local first, then cloudinary)
}) => {
    // 1. Ensure book exists
    const bookExists = await findBookById(bookId);
    if (!bookExists) {
        throw new ApiError(404, "No Book found with the given ID", "BOOK_NOT_FOUND");
    }

    // 2. Upload cover image to Cloudinary
    const coverImageUpload = await getCloudinaryUrl(imageFile.path);
    const coverImageUrl = coverImageUpload?.url;
    if (!coverImageUrl) throw new ApiError(500, "Cover image upload failed");

    // 3. Create chapter without images first
    const initialChapter = await chapterRepo.createChapter({
        userId,
        bookId,
        name,
        image: coverImageUrl,
        isMids,
        images: [],
    });

    // 4. Upload chapter images to Cloudinary + create Image docs
    const imageIds = [];

    for (const file of imageFilesArray) {
        // Upload to Cloudinary for persistence
        const uploaded = await getCloudinaryUrl(file.path);
        if (!uploaded?.url) {
            throw new ApiError(
                500,
                "Chapter Created but failed to upload Image.",
                "UPLOAD_ERROR"
            );
        }

        // Create Image doc
        const imageDoc = await imageRepo.createImage({
            userId,
            chapterId: initialChapter._id,
            name: `${Date.now()}-${file.originalname}`,
            url: uploaded.url, // permanent Cloudinary URL
        });

        // ✅ Queue worker with local path for fast OCR
        await imageQueue.add("process-image", {
            imageId: imageDoc._id.toString(),
            url: uploaded.url, // local path for OCR
            userId,
        });

        imageIds.push(imageDoc._id);
    }

    // 5. Update chapter with image references
    initialChapter.images = imageIds;
    await initialChapter.save();

    // 6. Push chapter into book
    await addChapterToBook(bookId, initialChapter._id);

    return initialChapter;
};


export const getUserChapters = async (userId) => {
    const chapters = await chapterRepo.findByUserId(userId);

    if (!chapters || chapters.length === 0) {
        throw new ApiError(404, "No chapters found for this user", "NOT_FOUND");
    }
    return chapters;
};

export const getChapterById = async (userId, chapterId) => {
    const chapter = await chapterRepo.findByIdAndUser(userId, chapterId);

    if (!chapter) {
        throw new ApiError(404, "Chapter not found", "NOT_FOUND");
    }

    return chapter;
};

export const updateChapter = async (userId, chapterId, updateData) => {
    const chapter = await chapterRepo.updateChapterById(userId, chapterId, updateData);

    if (!chapter) {
        throw new ApiError(404, "Chapter not found or you do not have permission to update it", "NOT_FOUND");
    }

    return chapter;
};

export const deleteChapter = async (userId, chapterId) => {
    const deletedChapter = await chapterRepo.deleteChapterById(userId, chapterId);

    if (!deletedChapter) {
        throw new ApiError(404, "Chapter not found or you do not have permission to delete it", "NOT_FOUND");
    }

    return deletedChapter;
};



