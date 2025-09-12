import axios from "../axiosInstance.js";

// requirements => bookId, name (text),isMids (true/false),image(chapter cover),images(inside chapter images).

export const createChapter = async (payload) => {
  const res = await axios.post("/chapters/create", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// reqirements => id of the book to delete and token that axios Instance will handle on it's own.

export const deleteChapter = async (id) => {
  const res = await axios.delete(`/chapters/deleteChapter/${id}`);

  return res.data;
};

// requirements => Id of the book to get the chatpers of that specific book

export const getChaptersByBookId = async (id) => {
  const res = await axios.get(`/chapters/getAllChaptersByBook/${id}`);

  return res.data;
};

export const updateChapter = async (chapterId, payload) => {
  const res = await axios.put(
    `/chapters/updateChapter/${chapterId}`,
    payload
  );
  return res.data;
};

export const getAllChaptersByUser = async () => {
  const res = await axios.get("/chapters/getAllChapters");

  return res.data;
};
