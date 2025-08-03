import { generateTokens } from "./auth.services.js";
import ApiError from "../utils ( reusables )/ApiError.js";
import { createUser, findUserByEmail, findUserByEmailOrUsername, findUserById } from "../repositories/user.repository.js";
import mongoose from "mongoose";
import jwtConfig from "../config (db connect)/jwt.config.js";

export const registerUser = async ({ username, email, password }) => {
    try {
        const existingUser = await findUserByEmailOrUsername(email, username);
        if (existingUser) {
            throw new ApiError(409, "Email or username already exists", "CONFLICT_ERROR");
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            throw new ApiError(400, "Invalid email format", "VALIDATION_ERROR");
        }

        let user = await createUser({
            username,
            email,
            password
        });
        let token = await generateTokens(user);

        return {
            user: {
                username: user?.username,
                email: user?.email,
                profileImage: user?.profileImage,
                createdAt: user?.createdAt
            },
            tokens: {
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            }
        }

    } catch (error) {
        if (!(error instanceof ApiError)) {
            throw new ApiError(500, "User registration failed", "REGISTRATION_ERROR", error);
        }
        throw (error);
    }
}

export const loginUser = async (email, password) => {
    try {
        if (email.trim() === "" || password.trim() === "") {
            throw new ApiError(422, "Email and password cannot be empty", "INVALID_CREDENTIALS");
        }

        // check that if the user with this email exists or not
        let user = await findUserByEmail(email);
        if (!user) {
            throw new ApiError(401, "Email doest not exists", "AUTH_ERROR");
        }

        let isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid Password", "AUTH_ERROR");
        }

        // confirmed that the user exists
        let tokens = await generateTokens(user);

        let userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        delete userWithoutPassword.refreshTokens;

        return {
            user: userWithoutPassword,
            tokens
        }

    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Login failed. Please try again later", "INTERNAL_ERROR");
    }
}

export const logoutUser = async (id, refreshToken) => {
    try {
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) {
            throw new ApiError(400, "Invalid ID format", "INVALID_ID");
        }
        if (id.length !== 24) {
            throw new ApiError(400, "ID must be 24 characters", "INVALID_ID_LENGTH");
        }
        if (!jwtConfig.verifyToken(refreshToken)) {
            throw new ApiError(401, "Invalid or expired refresh token", "INVALID_TOKEN");
        }

        let user = await findUserById(id);
        if (!user) {
            throw new ApiError(404, "No user to logout found", "NO_DATA_FOUND");
        }

        let dbResult = await user.removeRefreshToken(refreshToken);
        if (dbResult) {
            return { message: "logged out successfully" };
        }
        throw new ApiError(400, "In-valid Token", "UN-AUTHORIZED");
    }
    catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        if (error.name === 'JsonWebTokenError') {
            return next(new ApiError(401, "Invalid token", "JWT_ERROR"));
        }

        if (error.name === 'TokenExpiredError') {
            return next(new ApiError(401, "Token expired", "TOKEN_EXPIRED"));
        }
        throw new ApiError(500, "Logout failed. Please try again later", "INTERNAL_ERROR");
    }
}