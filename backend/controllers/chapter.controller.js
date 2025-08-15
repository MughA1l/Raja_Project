import mongoose from 'mongoose';
import successResponse from '../utils ( reusables )/responseHandler.js';
import * as chapterService from '../services/chapter.services.js'
import ApiError from '../utils ( reusables )/ApiError.js';

export const createChapter = async (req, res, next) => {
    try {
        const { name, bookId, isMids } = req.body;
        const userId = req.user?.userId;
        const files = req.files;

        const imageFile = files?.image?.[0];
        const imageFilesArray = files?.images || [];

        if (!name || !bookId || typeof isMids === 'undefined' || !imageFile) {
            throw new ApiError(400, 'All required fields must be provided', 'MISSING_FIELDS');
        }

        const chapter = await chapterService.createChapter({
            userId,
            name,
            bookId,
            isMids,
            imageFile,
            imageFilesArray,
        });

        return successResponse(res, {
            message: 'Chapter created successfully!',
            chapter,
        }, 201);

    } catch (error) {
        next(error);
    }
};
