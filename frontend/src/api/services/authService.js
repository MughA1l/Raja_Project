import axios from '../axiosInstance';

const loginUser = async (credentials) => {
    const res = await axios.post('/login', credentials);
    return res.data;
};

const registerUser = async (userData) => {
    const res = await axios.post('/register', userData);
    return res.data;
};

export { registerUser, loginUser };