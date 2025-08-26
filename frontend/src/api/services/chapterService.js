
import axios from "../axiosInstance.js";


// requirements => bookId, name (text),isMids (true/false),image(chapter cover),images(inside chapter images).

export const createChapter = async (payload) => {
    const res = await axios.post('/chapters/create', payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return res.data;
}