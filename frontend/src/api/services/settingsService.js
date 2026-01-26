import axios from "../axiosInstance";

// Get user profile
export const getUserProfile = async () => {
  const res = await axios.get("/settings/profile");
  return res.data;
};

// Update user profile (username, email, profileImage)
export const updateUserProfile = async (payload) => {
  const res = await axios.put("/settings/profile", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Change password
export const changePassword = async (payload) => {
  const res = await axios.patch("/settings/password", payload);
  return res.data;
};

// Get user statistics
export const getUserStatistics = async () => {
  const res = await axios.get("/settings/statistics");
  return res.data;
};

// Logout from all sessions
export const logoutAllSessions = async () => {
  const res = await axios.post("/settings/logout-all");
  return res.data;
};

// Delete account
export const deleteAccount = async (payload) => {
  const res = await axios.delete("/settings/account", { data: payload });
  return res.data;
};
