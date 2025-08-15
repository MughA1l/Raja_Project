
import getCloudinaryUrl from '../utils ( reusables )/ImageUpload.js';
import * as chapterRepo from '../repositories/chapter.repository.js'
import { addChapterToBook } from './book.services.js';
import ApiError from '../utils ( reusables )/ApiError.js';
import * as imageRepo from '../repositories/image.repository.js'

export const createChapter = async ({ userId, name, bookId, isMids, imageFile, imageFilesArray }) => {

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


