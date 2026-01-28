import axios from "../axiosInstance";

// Get dashboard data (stats + recent items)
export const getDashboardData = async () => {
  const res = await axios.get("/dashboard");
  return res.data;
};
