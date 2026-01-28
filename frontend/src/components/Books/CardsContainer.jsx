import React, { useState } from "react";
import Card from "@books/Card";
import { toast } from "react-toastify";
import { deleteBook } from "@services/bookService";
import { showSuccess } from "@utils/toast";
import ConfirmationModal from "@general/ConfirmationModal.jsx";
import EditBook from "@books/EditBook.jsx";
import { BookMarked } from "lucide-react";

const CardsContainer = ({
  books,
  setBooks,
  loading,
  hasLoaded,
  setLoading,
  getAllBooks,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
    setDeleteLoading(true);
    try {
      if (selectedBook) {
        const response = await deleteBook(selectedBook._id);
        if (response.success) {
          showSuccess("Book deleted successfully");
          setBooks((prev) =>
            prev.filter((b) => b._id !== selectedBook._id)
          );
        }
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to delete book");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
      setSelectedBook(null);
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setIsEditModalOpen(true);
  };

  return (
    <div className="pt-6 md:pt-10 relative">
      {/* Show skeleton while loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-black/6 h-80 p-2 mb-3 relative">
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
      ) : hasLoaded && books.length === 0 ? (
        /* Show empty state only when loaded and confirmed no books */
        <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4">
          <div className="bg-light-pink/10 rounded-full p-4 md:p-6 mb-4 md:mb-6">
            <BookMarked size={48} className="md:w-16 md:h-16 text-light-pink" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            No Books Available
          </h2>
          <p className="text-sm md:text-base text-gray-500 text-center max-w-md">
            Start your study journey by creating your first book.
          </p>
        </div>
      ) : (
        /* Show books */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {books.map((singleBook, index) => (
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
          ))}
        </div>
      )}

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
        loading={deleteLoading}
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
            setBooks((prev) =>
              prev.map((b) =>
                b._id === updatedBook._id ? updatedBook : b
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default CardsContainer;
