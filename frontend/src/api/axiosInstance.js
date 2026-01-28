import axios from "axios";
import { toast } from "react-toastify";
import { getToken, setToken, removeToken } from "../utils/token";
import { logoutUser } from "../api/services/authService.js";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
});

// Request Interceptor: Add access token
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  // Only attach token to non-auth routes
  if (
    token &&
    ![
      "/users/login",
      "/users/register",
      "/users/send-code",
      "/users/verify-code",
      "/users/reset-password",
    ].includes(config.url)
  ) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor: Handle access token expiry
axiosInstance.interceptors.response.use(
  (response) => {
    // If new token sent by backend (e.g. via x-access-token), update it
    const newAccessToken = response.headers["x-access-token"];
    if (newAccessToken) {
      setToken(newAccessToken);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errorType = error?.response?.data?.error?.type;

    console.log(errorType);

    // ACCESS_TOKEN_EXPIRED: try retrying after backend gives new access token
    if (
      errorType === "ACCESS_TOKEN_EXPIRED" &&
      !originalRequest._retry // prevent infinite loop
    ) {
      originalRequest._retry = true;

      const newAccessToken = error.response.headers["x-access-token"];

      if (newAccessToken) {
        setToken(newAccessToken);
        originalRequest.headers["Authorization"] =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } else {
        // Refresh token failed or expired —> force logout
        await logoutUser();
        removeToken();
        window.location.href = "http://localhost:5173/login";
      }
    }

    // Generic error toast
    const message =
      error?.response?.data?.message || "Something went wrong";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
