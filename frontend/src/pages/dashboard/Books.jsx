import React, { useEffect } from "react";
import Header from "@books/Header";
import CardsContainer from "@books/CardsContainer";
import CreateBookDrawer from "@books/CreateBookDrawer";
import { useState } from "react";
import { toast } from "react-toastify";
import { getAllBooksByUser } from "@services/bookService";

const Books = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [books, setBooks] = useState([]);

  // State to show the filtered books like all, favourite etc.
  const [filteredBooks, setFilteredBooks] = useState([]);

  const [filter, setFilter] = useState("");

  // Always calculate tabOptions, even when books is empty
  const tabOptions = [
    { label: "All Books", count: books.length },
    {
      label: "Complete",
      count: books.filter((b) => b.isComplete).length,
    },
    {
      label: "InComplete",
      count: books.filter((b) => !b.isComplete).length,
    },
    {
      label: "Favourite",
      count: books.filter((b) => b.isFavourite).length,
    },
  ];

  const getAllBooks = async () => {
    try {
      setLoading(true);
      let books = await getAllBooksByUser();
      if (books.success) {
        const fetchedBooks = books.data || [];
        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks);
        setHasLoaded(true);
        setLoading(false);
      } else {
        setHasLoaded(true);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to get Books");
      setHasLoaded(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    if (!books.length) {
      setFilteredBooks([]);
      return;
    }

    let filtered = books;

    switch (selected) {
      case 1: // Complete
        filtered = books.filter((b) => b.isComplete);
        break;
      case 2: // InComplete
        filtered = books.filter((b) => !b.isComplete);
        break;
      case 3: // Favourite
        filtered = books.filter((b) => b.isFavourite);
        break;
      default: // All Books
        filtered = books;
    }

    const filteredBy = filtered.filter((book) =>
      book.name.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredBooks(filteredBy);
  }, [selected, books, filter]);

  return (
    <div className="">
      <div className="max-h-fit min-h-screen w-full rounded-xl bg-[#F7F7F7] p-5 pt-5">
        {/* header */}
        <Header
          tabOptions={tabOptions}
          filter={filter}
          setFilter={setFilter}
          onCreateClick={() => setIsDrawerOpen(true)}
          selected={selected}
          setSelected={setSelected}
        />

        {/* cards container */}
        <CardsContainer
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          books={filteredBooks}
          getAllBooks={getAllBooks}
          setBooks={setBooks}
          loading={loading}
          hasLoaded={hasLoaded}
          setLoading={setLoading}
        />
      </div>

      {/* Drawer */}
      <CreateBookDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        getAllBooks={getAllBooks}
      />

      {/* overlay */}
      {(isDrawerOpen || isEditModalOpen) && (
        <div
          className="absolute inset-0 z-0 h-screen w-screen bg-black/30"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        ></div>
      )}
    </div>
  );
};

export default Books;
