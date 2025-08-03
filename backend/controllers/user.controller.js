import { registerUser } from '../services/user.services.js';
import ApiError from '../utils ( reusables )/ApiError.js'
import successResponse from '../utils ( reusables )/responseHandler.js';

export const register = async (req, res, next) => {
    try {
        // validate input data
        let { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required", "MISSING_DATA");
        }
        const payload = { username, email, password };
        // service call
        const createUser = await registerUser(payload);
        console.log('created User');

        // send the access and set the refresh-token
        let { user, tokens } = createUser;
        console.log(tokens)

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return successResponse(res, { user: user, accessToken: tokens?.accessToken }, 201);

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

export const login = () => {
    res.send('login done');
}

export const getCode = () => {
    res.send('your code is 493');
}

export const resetPassword = () => {
    res.send('Reset password successfully');
}
