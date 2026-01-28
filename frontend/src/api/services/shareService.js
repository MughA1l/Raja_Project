import axios from "../axiosInstance";

// Share a chapter (generate share link)
export const shareChapter = async (chapterId) => {
  const res = await axios.post(`/chapters/share/${chapterId}`);
  return res.data;
};

// Revoke chapter sharing
export const unshareChapter = async (chapterId) => {
  const res = await axios.delete(`/chapters/share/${chapterId}`);
  return res.data;
};

// Get share info for a chapter
export const getShareInfo = async (chapterId) => {
  const res = await axios.get(`/chapters/share/${chapterId}`);
  return res.data;
};

// Get public shared chapter (no auth required)
export const getSharedChapter = async (shareToken) => {
  const res = await axios.get(`/chapters/public/${shareToken}`);
  return res.data;
};
