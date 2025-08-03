import { generateTokens } from "./auth.services.js";
import ApiError from "../utils ( reusables )/ApiError.js";
import { createUser, findUserByEmailOrUsername } from "../repositories/user.repository.js";

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

export const loginUser = async (email, password) => { }