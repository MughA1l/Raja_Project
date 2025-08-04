import { generateTokens } from "./auth.services.js";
import ApiError from "../utils ( reusables )/ApiError.js";
import { createUser, FindSavedCode, findUserByEmail, findUserByEmailOrUsername, findUserById, SaveCodeInDb, updateUserPasswordByEmail } from "../repositories/user.repository.js";
import mongoose from "mongoose";
import jwtConfig from "../config (db connect)/jwt.config.js";
import { generateFourDigitCode } from "../utils ( reusables )/generateFourDigitCode.js";
import { sendCodeOnGmail } from "../utils ( reusables )/GmailCodeSend.js";

export const registerUser = async ({ username, email, password }) => {

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
}

export const loginUser = async (email, password) => {

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

export const logoutUser = async (id, refreshToken) => {

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


export const UserCode = async (email) => {

    if (email.trim() === "") {
        throw new ApiError(422, "Email cannot be empty", "INVALID_CREDENTIALS");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        throw new ApiError(400, "Invalid email format", "VALIDATION_ERROR");
    }

    let user = await findUserByEmail(email);
    if (!user) {
        throw new ApiError(404, "user not found", "NO_USER_FOUND");
    }
    let generateCode = generateFourDigitCode();
    if (!generateCode) {
        throw new ApiError(500, "Failed to generate code", "CODE_GENERATE_ERROR");
    }

    // save the code in the db and send it on the gmail.
    const saveCode = await SaveCodeInDb(email, generateCode);
    if (!saveCode) {
        throw new ApiError(500, "Failed to save code", "DB_ERROR");
    }
    // call the send code on gmail using this saveCode information
    let codeSent = await sendCodeOnGmail(saveCode?.email, saveCode?.code);
    if (!codeSent) {
        throw new ApiError(500, "Failed to send code to gmail", "GMAIL_SEND_ERROR");
    }
    return { message: "Code sent to gmail" };
}

export const userPasswordReset = async (email, code, newPassword) => {

    if (email.trim() === "" || newPassword.trim() === "") {
        throw new ApiError(422, "Email and Password cannot be empty", "INVALID_CREDENTIALS");
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        throw new ApiError(400, "Invalid email format", "VALIDATION_ERROR");
    }

    // find the code saved if available then reset password
    let codeDoc = await FindSavedCode(email, code);
    if (!codeDoc) {
        throw new ApiError(400, "Un-authorized attempt", "UN-AUTHORIZED");
    }

    // update the password
    let updation = await updateUserPasswordByEmail(email, newPassword);
    if (!updation) {
        throw new ApiError(500, "Failed to update the password using email", "Internal Error");
    }
    return {
        message: "Updated user successfully"
    }
}