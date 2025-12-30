import axios from "../axiosInstance.js";

export const updateImage = async (imageId, payload) => {
  const res = await axios.put(`/images/updateImage/${imageId}`, payload);
  return res.data;
};

export const deleteImage = async (imageId) => {
  const res = await axios.delete(`/images/deleteImage/${imageId}`);
  return res.data;
};

export const getAllImages = async () => {
  const res = await axios.get('/images/getAllImages');
  return res.data;
};
