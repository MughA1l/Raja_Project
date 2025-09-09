
import axios from '../axiosInstance.js';

// requirements => name (text => unique),image

export const createBook = async (payload) => {
    const res = await axios.post('/books/create', payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    }
    );
    return res.data;
}

// requirements => nothing just send request if logged-in

export const getAllBooksByUser = async () => {
    const res = await axios.get('/books/getAllBooks');
    return res.data;
}

// requirements => bookId

export const getSingleBook = async (bookId) => {
    const res = await axios.get(`/books/getSingleBook/${bookId}`);
    return res.data;
}

// requirements => just give an object with details to update with bookId

export const updateBook = async (bookId, payload) => {
    const res = await axios.put(`/books/updateBook/${bookId}`, payload,
        {
            headers: { "Content-Type": "multipart/form-data" }
        }
    );
    return res.data;
}

// requirements => bookId

export const deleteBook = async (bookId) => {
    const res = await axios.delete(`/books/deleteBook/${bookId}`);
    return res.data;
}


