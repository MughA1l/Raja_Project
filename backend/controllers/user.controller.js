
import { loginUser, registerUser, logoutUser, UserCode } from '../services/user.services.js';
import ApiError from '../utils ( reusables )/ApiError.js'
import successResponse from '../utils ( reusables )/responseHandler.js';

export const register = async (req, res, next) => {
    try {
        // validate input data
        let { username, email, password } = req.body || {};
        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required", "MISSING_DATA");
        }
        const payload = { username, email, password };
        // service call
        const createUser = await registerUser(payload);

        // send the access and set the refresh-token
        let { user, tokens } = createUser;

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return successResponse(res, { user, accessToken: tokens?.accessToken }, 201);

    } catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }

        return next(
            new ApiError(
                500,
                "User registration failed",
                "REGISTRATION_ERROR",
            )
        );
    }

}

export const login = async (req, res, next) => {

    let { email, password } = req.body || {};
    try {
        if (!email || !password) {
            throw new ApiError(400, "Email and Password are required", "MISSING_CREDENTIALS")
        }

        let { user, tokens } = await loginUser(email, password);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return successResponse(res, { user, accessToken: tokens?.accessToken }, 200);

    }
    catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }
        return next(
            new ApiError(
                500,
                "User Login failed",
                "LOGIN_ERROR",
            )
        );

    }
}

export const logout = async (req, res, next) => {
    try {
        let { id } = req.body || {};
        let refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new ApiError(401, "No refresh token found", "UNAUTHORIZED");
        }
        if (!id) {
            throw new ApiError(400, "Missing Id", "MISSING_DETAILS")
        }

        let response = await logoutUser(id, refreshToken);
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
        });
        return successResponse(res, response, 200);
    }
    catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }
        return next(
            new ApiError(
                500,
                "Logout Failed",
                "LOGOUT_ERROR",
            )
        );
    }
}

export const getCode = async (req, res, next) => {
    try {
        const { email } = req.body || {};
        if (!email) {
            throw new ApiError(400, "Email is Missing", "MISSING_DATA");
        }

        const message = await UserCode(email);

        return successResponse(res, message, 200);

    } catch (error) {
        return next(error);
    }
}

export const resetPassword = () => {
    res.send('Reset password successfully');
}
