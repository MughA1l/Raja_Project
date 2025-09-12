import { removeToken } from "../../utils/token";
import axios from "../axiosInstance";

const loginUser = async (credentials) => {
  const res = await axios.post("/users/login", credentials);
  return res.data;
};

const registerUser = async (userData) => {
  const res = await axios.post("/users/register", userData);
  return res.data;
};

const getCodeByEmail = async (email) => {
  const res = await axios.post("/users/send-code", email);
  return res.data;
};

const verfiyCode = async (userData) => {
  const res = await axios.post("/users/verify-code", userData);
  return res.data;
};

const resetPassword = async (userData) => {
  const res = await axios.patch("/users/reset-password", userData);
  return res.data;
};

const logoutUser = async () => {
  try {
    await axios.post("/users/logout");
    removeToken(); // clear access token

    // move the user to the login page
    window.location.href = "http://localhost:5173/login";
  } catch (err) {
    console.error("Logout failed", err);
  }
};

export {
  registerUser,
  loginUser,
  getCodeByEmail,
  verfiyCode,
  resetPassword,
  logoutUser,
};
