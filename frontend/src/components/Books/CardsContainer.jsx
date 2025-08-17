import React, { useEffect, useState } from 'react';
// import { books } from '../../placeholder/Books.data';
import Card from './Card';
import { toast } from 'react-toastify';
import { getAllBooksByUser } from '../../api/services/bookService';

const CardsContainer = () => {

    const [openCardIndex, setOpenCardIndex] = useState(null);

    // state to hold all the books
    const [books, setBooks] = useState([]);

    const handleCardClick = (index) => {
        setOpenCardIndex(index === openCardIndex ? null : index);
    };

    const handleCloseOptions = () => {
        setOpenCardIndex(null);
    };

    const getAllBooks = async () => {
        try {
            let books = await getAllBooksByUser();

            if (books.success) {
                setBooks(books.data);
            }
        } catch (error) {
            console.log('Error', error);
            toast.error('Failed to get Books')
        }
    }

    useEffect(() => {
        getAllBooks()
    }, [])



    return (
        <div className='pt-10 relative'>
            <div className='grid grid-cols-4 gap-3'>
                {books.map((singleBook, index) => (
                    <Card
                        key={index} // Using index as a fallback key
                        book={singleBook}
                        showOptions={openCardIndex === index}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
            </div>

            {openCardIndex !== null && (
                <div
                    className='h-screen cursor-pointer w-screen bg-transparent fixed z-20 inset-0'
                    onClick={handleCloseOptions}
                ></div>
            )}
        </div>
    );
};

export default CardsContainer;