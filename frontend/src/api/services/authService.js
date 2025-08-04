import axios from '../axiosInstance';

const loginUser = async (credentials) => {
    const res = await axios.post('/users/login', credentials);
    return res.data;
};

const registerUser = async (userData) => {
    const res = await axios.post('/users/register', userData);
    return res.data;
};

export { registerUser, loginUser };