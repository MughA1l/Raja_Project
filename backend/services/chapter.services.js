
import getCloudinaryUrl from '../utils ( reusables )/ImageUpload.js';
import * as chapterRepo from '../repositories/chapter.repository.js'
import { addChapterToBook } from './book.services.js';
import ApiError from '../utils ( reusables )/ApiError.js';
import * as imageRepo from '../repositories/image.repository.js'
// book repository function
import { findBookById } from '../repositories/book.repository.js';

export const createChapter = async ({ userId, name, bookId, isMids, imageFile, imageFilesArray }) => {

    // create a chapter when book exists.
    const bookExists = await findBookById(bookId);
    if (!bookExists) {
        throw new ApiError(404, 'No Book found with the given ID', 'BOOK_NOT_FOUND');
    }

    // Card Image
    const coverImageUpload = await getCloudinaryUrl(imageFile.path);
    const coverImageUrl = coverImageUpload?.url;
    if (!coverImageUrl) throw new ApiError(500, 'Cover image upload failed');

    // First, create an empty Chapter (without images)
    const initialChapter = await chapterRepo.createChapter({
        userId,
        bookId,
        name,
        image: coverImageUrl,
        isMids,
        images: [], // fill this after image creation
    });

    // Upload images and create Image docs (with real chapterId)
    const imageIds = [];

    for (const file of imageFilesArray) {
        const uploaded = await getCloudinaryUrl(file.path);
        if (!uploaded?.url) {
            throw new ApiError(500, 'Chapter Created but failed to upload Image.', 'UPLOAD_ERROR');
        }

        const imageDoc = await imageRepo.createImage({
            userId,
            chapterId: initialChapter._id,
            name: `${Date.now()}-${file.originalname}`,
            url: uploaded.url,
        });

        imageIds.push(imageDoc._id);
    }

    // 4. Update Chapter with image ObjectIds
    initialChapter.images = imageIds;
    await initialChapter.save();

    // 5. Push the chapter ID to the book
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



