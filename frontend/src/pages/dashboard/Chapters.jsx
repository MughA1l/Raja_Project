import React, { useEffect, useState } from "react";
import Header from "@chapters/Header";
import CardsContainer from "@chapters/CardsContainer";
import CreateChapterDrawer from "@chapters/CreateChapterDrawer";
import { useParams } from "react-router-dom";
import {
  getAllChaptersByUser,
  getChaptersByBookId,
} from "@services/chapterService";
import { showError } from "@utils/toast";

const Chapters = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const { bookId } = useParams();

  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);

  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [filter, setFilter] = useState("");

  // Always calculate tabOptions, even when chapters is empty
  const tabOptions = [
    { label: "All Chatpers", count: chapters.length },
    {
      label: "Mids",
      count: chapters.filter((c) => c.isMids).length,
    },
    {
      label: "Finals",
      count: chapters.filter((c) => !c.isMids).length,
    },
    {
      label: "Complete",
      count: chapters.filter((c) => c.isCompleted).length,
    },
    {
      label: "InComplete",
      count: chapters.filter((c) => !c.isCompleted).length,
    },
    {
      label: "Favourite",
      count: chapters.filter((c) => c.isFavourite).length,
    },
  ];

  useEffect(() => {
    if (!chapters?.length) {
      setFilteredChapters([]);
      return;
    }

    let filtered = chapters;

    switch (selected) {
      case 1: // Mids
        filtered = chapters.filter((c) => c.isMids);
        break;
      case 2: // Finals
        filtered = chapters.filter((c) => !c.isMids);
        break;
      case 3: // Complete
        filtered = chapters.filter((c) => c.isCompleted);
        break;
      case 4: // InComplete
        filtered = chapters.filter((c) => !c.isCompleted);
        break;
      case 5: // Favourite
        filtered = chapters.filter((c) => c.isFavourite);
        break;
      default: // All
        filtered = chapters;
    }

    const filteredBy = filtered.filter((chapter) =>
      chapter.name.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredChapters(filteredBy);
  }, [selected, chapters, filter]);

  const getChapterFromBackend = async () => {
    setLoading(true);
    try {
      const backChapters = await getChaptersByBookId(bookId);

      if (backChapters.success) {
        const fetchedChapters = backChapters.data?.chapters || [];
        setChapters(fetchedChapters);
        setFilteredChapters(fetchedChapters);
        setHasLoaded(true);
        setLoading(false);
      } else {
        setHasLoaded(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      showError("Error while fetching the chapters");
      setHasLoaded(true);
      setLoading(false);
    }
  };

  const getChaptersByUser = async () => {
    setLoading(true);
    try {
      const userChapters = await getAllChaptersByUser();

      if (userChapters.success) {
        const fetchedChapters = userChapters.data?.chapters || [];
        setChapters(fetchedChapters);
        setFilteredChapters(fetchedChapters);
        setHasLoaded(true);
        setLoading(false);
      } else {
        setHasLoaded(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      showError("Error while fetching the chapters");
      setHasLoaded(true);
      setLoading(false);
    }
  };

  // get chapters from backend if there is book id available
  useEffect(() => {
    bookId ? getChapterFromBackend() : getChaptersByUser();
  }, [bookId]);

  return (
    <div className="">
      <div className="min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl">
        {/* header */}
        <Header
          filter={filter}
          setFilter={setFilter}
          selected={selected}
          setSelected={setSelected}
          tabOptions={tabOptions} // pass dynamic counts
          onCreateClick={() => {
            setIsDrawerOpen(true);
          }}
        />

        {/* cards container */}
        <CardsContainer
          bookId={bookId}
          fetchChapters={
            bookId ? getChapterFromBackend : getChaptersByUser
          }
          loading={loading}
          hasLoaded={hasLoaded}
          chapters={filteredChapters}
          setChapters={setChapters}
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
        />
      </div>

      {/* Drawer */}
      <CreateChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        chapters={chapters}
        setChapters={setChapters}
        fetchChapters={
          bookId ? getChapterFromBackend : getChaptersByUser
        }
        bookId={bookId}
      />

      {/* overlay */}
      {isDrawerOpen && (
        <div
          className="absolute inset-0 h-screen w-screen z-0 bg-black/30"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        ></div>
      )}
    </div>
  );
};

export default Chapters;
