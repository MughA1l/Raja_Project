
import React, { useEffect } from 'react'
import Header from '../../components/Books/Header';
import CardsContainer from '../../components/Books/CardsContainer';
import CreateBookDrawer from '../../components/Books/CreateBookDrawer';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getAllBooksByUser } from '../../api/services/bookService';

let tabOptions = [];
const Books = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState();

  const [books, setBooks] = useState([]);

  // State to show the filtered books like all, favourite etc.
  const [filteredBooks, setFilteredBooks] = useState([]);



  const getAllBooks = async () => {
    try {
      setLoading(true);
      let books = await getAllBooksByUser();
      if (books.success) {
        setBooks(books.data);
      }
    } catch (error) {
      console.log('Error', error);
      toast.error('Failed to get Books');
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);


  useEffect(() => {
    if (!books.length) return;

    let filtered = books;

    switch (selected) {
      case 1: // Complete
        filtered = books.filter(b => b.isComplete);
        break;
      case 2: // InComplete
        filtered = books.filter(b => !b.isComplete);
        break;
      case 3: // Favourite
        filtered = books.filter(b => b.isFavourite);
        break;
      default: // All Books
        filtered = books;
    }

    setFilteredBooks(filtered);
  }, [selected, books]);

  useEffect(() => {
    tabOptions = [
      { label: "All Books", count: books.length },
      { label: "Complete", count: books.filter(b => b.isComplete).length },
      { label: "InComplete", count: books.filter(b => !b.isComplete).length },
      { label: "Favourite", count: books.filter(b => b.isFavourite).length },
    ];
  }, [books])



  return (
    <div className=''>
      <div className='min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl'>

        {/* header */}
        <Header tabOptions={tabOptions} onCreateClick={() => setIsDrawerOpen(true)} selected={selected} setSelected={setSelected} />

        {/* cards container */}
        <CardsContainer books={filteredBooks} setBooks={setBooks} loading={loading} setLoading={setLoading} />

      </div>

      {/* Drawer */}
      <CreateBookDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        getAllBooks={getAllBooks}
      />

      {/* overlay */}
      {isDrawerOpen && <div className="absolute inset-0 h-screen w-screen z-0 bg-black/30"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      ></div>}

    </div>
  )
}

export default Books;