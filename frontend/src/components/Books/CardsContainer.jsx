import React, { useEffect, useState } from 'react';
import Card from './Card';
import { toast } from 'react-toastify';
import { deleteBook } from '../../api/services/bookService';
import { showSuccess } from '../../utils/toast';
import ConfirmationModal from '../general/ConfirmationModal.jsx';
import EditBook from './EditBook.jsx';

const CardsContainer = ({
  books,
  setBooks,
  loading,
  setLoading,
  getAllBooks,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [editBook, setEditBook] = useState(null);

  const handleCardClick = (index) => {
    setOpenCardIndex(index === openCardIndex ? null : index);
  };

  const handleCloseOptions = () => {
    setOpenCardIndex(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const onCancel = () => {
    setOpenCardIndex(null);
    setIsDeleteModalOpen(false);
    setSelectedBook(null);
  };

  const onConfirm = async () => {
    try {
      if (selectedBook) {
        const response = await deleteBook(selectedBook._id);
        if (response.success) {
          showSuccess('Book deleted successfully');
          setBooks((prev) => prev.filter((b) => b._id !== selectedBook._id));
        }
      }
    } catch (error) {
      console.log('Error', error);
      toast.error('Failed to delete book');
    }
    setIsDeleteModalOpen(false);
    setSelectedBook(null);
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setIsEditModalOpen(true);
  };

  // if after loading no books found then show no books found
  if (books.length == 0 && !loading) {
    return <>No books found!</>;
  }

  return (
    <div className="pt-10 relative">
      <div className="grid grid-cols-4 gap-3">
        {!loading
          ? books.map((singleBook, index) => (
              <Card
                key={singleBook._id}
                book={singleBook}
                showOptions={openCardIndex === index}
                onClick={() => handleCardClick(index)}
                onDelete={() => handleDeleteBook(singleBook)}
                onEdit={() => handleEdit(singleBook)}
                getAllBooks={getAllBooks}
                setBooks={setBooks}
                isEditModalOpen={isEditModalOpen}
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white col-span-1 rounded-2xl border border-black/6 h-80 p-2 mb-3 relative"
              >
                <div className="h-7/12 w-full rounded-2xl overflow-hidden">
                  <div className="skeleton h-full w-full"></div>
                </div>
                <div className="pt-5 px-2 pb-2 space-y-2">
                  <div className="skeleton h-3 w-24"></div>
                  <div className="skeleton h-4 w-32"></div>
                  <div className="skeleton h-4 w-20"></div>
                </div>
                <div className="w-full px-2 flex items-center gap-2">
                  <div className="skeleton h-3 w-7/12 rounded-full"></div>
                  <div className="skeleton h-3 w-10"></div>
                </div>
                <div className="absolute bottom-4 right-3">
                  <div className="skeleton h-8 w-8 rounded-lg"></div>
                </div>
                <div className="absolute top-5 left-4">
                  <div className="skeleton h-5 w-20 rounded-lg"></div>
                </div>
              </div>
            ))}
      </div>

      {openCardIndex !== null && (
        <div
          className="h-screen cursor-pointer w-screen bg-transparent fixed z-20 inset-0"
          onClick={handleCloseOptions}
        ></div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title={`Are you sure you want to delete ${selectedBook?.name} Book?`}
        para="By deleting this book you will lose all the material inside including Chapters, Images, OCR,Youtube Suggestions."
        onCancel={onCancel}
        onConfirm={onConfirm}
      />

      {isEditModalOpen && (
        <EditBook
          bookData={editBook}
          onClose={() => {
            setIsEditModalOpen(false);
            setOpenCardIndex(null);
          }}
          isOpen={isEditModalOpen}
          onUpdate={(updatedBook) => {
            // update local books list after editing
            setBooks((prev) => prev.map((b) => (b._id === updatedBook._id ? updatedBook : b)));
          }}
        />
      )}
    </div>
  );
};

export default CardsContainer;
