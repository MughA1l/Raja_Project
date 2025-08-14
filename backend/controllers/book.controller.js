import * as bookService from '../services/book.services.js';
import successResponse from '../utils ( reusables )/responseHandler.js';


export const createBook = async (req, res, next) => {
    try {
        // Placeholder logic
        return successResponse(res, { message: 'createBook controller hit' });
    } catch (error) {
        next(error);
    }
};

export const getUserBooks = async (req, res, next) => {
    try {
        return successResponse(res, { message: 'getUserBooks controller hit' });
    } catch (error) {
        next(error);
    }
};

export const getBookById = async (req, res, next) => {
    try {
        return successResponse(res, { message: 'getBookById controller hit' });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        return successResponse(res, { message: 'updateBook controller hit' });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        return successResponse(res, { message: 'deleteBook controller hit' });
    } catch (error) {
        next(error);
    }
};
