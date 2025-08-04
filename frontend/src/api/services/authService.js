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

const resetPassword = async () => {
    const res = await axios.post();
    return res.data;
}

export { registerUser, loginUser, getCodeByEmail };