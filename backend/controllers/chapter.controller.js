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

export const getUserChapters = async (req, res, next) => {
    try {
        const userId = req.user?.userId;

        // Validate userId
        if (!userId) {
            throw new ApiError(400, "User ID is required", "VALIDATION_ERROR");
        }
        const chapters = await chapterService.getUserChapters(userId);

        return successResponse(res, { chapters });
    } catch (error) {
        next(error);
    }
};

export const getChapterById = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const chapterId = req.params.id;

        // Validation
        if (!userId) {
            throw new ApiError(400, "User ID is required", "VALIDATION_ERROR");
        }
        if (!chapterId) {
            throw new ApiError(400, "Chapter ID is required", "VALIDATION_ERROR");
        }

        const chapter = await chapterService.getChapterById(userId, chapterId);

        return successResponse(res, { chapter });
    } catch (error) {
        next(error);
    }
};

export const updateChapter = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const chapterId = req.params.id;
        const updateData = req.body;

        // Validation
        if (!userId) {
            throw new ApiError(400, "User ID is required", "VALIDATION_ERROR");
        }
        if (!chapterId) {
            throw new ApiError(400, "Chapter ID is required", "VALIDATION_ERROR");
        }
        if (!updateData || Object.keys(updateData).length === 0) {
            throw new ApiError(400, "No data provided for update", "VALIDATION_ERROR");
        }

        const updatedChapter = await chapterService.updateChapter(userId, chapterId, updateData);

        return successResponse(res, { chapter: updatedChapter });
    } catch (error) {
        next(error);
    }
};

export const deleteChapter = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const chapterId = req.params.id;

        if (!userId) {
            throw new ApiError(400, "User ID is required", "VALIDATION_ERROR");
        }
        if (!chapterId) {
            throw new ApiError(400, "Chapter ID is required", "VALIDATION_ERROR");
        }
                 
        const deleted = await chapterService.deleteChapter(userId, chapterId);

        return successResponse(res, { message: "Chapter deleted successfully", chapter: deleted });
    } catch (error) {
        next(error);
    }
};