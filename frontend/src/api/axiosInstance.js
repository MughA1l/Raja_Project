import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../utils/token';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token && !['/login', '/register'].includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || 'Something went wrong';
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
