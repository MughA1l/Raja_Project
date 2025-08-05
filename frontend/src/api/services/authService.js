import axios from '../axiosInstance';

const loginUser = async (credentials) => {
    const res = await axios.post('/users/login', credentials);
    return res.data;
};

const registerUser = async (userData) => {
    const res = await axios.post('/users/register', userData);
    return res.data;
};

const getCodeByEmail = async (email) => {
    const res = await axios.post('/users/send-code', email);
    return res.data;
}

const verfiyCode = async (userData) => {
    const res = await axios.post('/users/verify-code', userData);
    return res.data;
}

const resetPassword = async (userData) => {
    const res = await axios.patch('/users/reset-password', userData);
    return res.data;
}

export { registerUser, loginUser, getCodeByEmail, verfiyCode, resetPassword };