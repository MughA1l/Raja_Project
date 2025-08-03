import User from "../models/User.model.js";
import ApiError from "../utils ( reusables )/ApiError.js"

export const createUser = async (userData) => {
    try {
        let user = await User.create(userData);

        return user;
    } catch (error) {
        // to handle password length error
        if (error.name === 'ValidationError') {
            const firstError = Object.values(error.errors)[0].message;
            throw new ApiError(400, firstError, "VALIDATION_ERROR");
        }

        throw new ApiError(500, "Database: Failed to create user", "DATABASE_ERROR", error);
    }
};

export const findUserByEmailOrUsername = async (email, username) => {
    try {
        return await User.findOne({
            $or: [{ email }, { username }]
        });
    } catch (error) {
        throw new ApiError(500, "Database: Query failed", "DATABASE_ERROR", error);
    }
};