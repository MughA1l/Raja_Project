import React, { useEffect, useState } from 'react';
import Header from '../../components/Chapters/Header';
import CardsContainer from '../../components/Chapters/CardsContainer';
import CreateChapterDrawer from '../../components/Chapters/CreateChapterDrawer';
import { useParams } from 'react-router-dom';
import { getAllChaptersByUser, getChaptersByBookId } from '../../api/services/chapterService';
import { showError } from '../../utils/toast';

const Chapters = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const { bookId } = useParams();

  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);

  const [loading, setLoading] = useState(false);

  console.log(chapters)

  useEffect(() => {
    if (!chapters?.length) return;

    let filtered = chapters;

    switch (selected) {
      case 1: // Mids
        filtered = chapters.filter(c => c.type === "Mid");
        break;
      case 2: // Finals
        filtered = chapters.filter(c => c.type === "Final");
        break;
      case 3: // Complete
        filtered = chapters.filter(c => c.isComplete);
        break;
      case 4: // InComplete
        filtered = chapters.filter(c => !c.isComplete);
        break;
      case 5: // Favourite
        filtered = chapters.filter(c => c.isFavourite);
        break;
      default: // All
        filtered = chapters;
    }

    setFilteredChapters(filtered);
  }, [selected, chapters]);


  const getChapterFromBackend = async () => {

    setLoading(true);
    try {
      const backChapters = await getChaptersByBookId(bookId);

      if (backChapters.success) {
        setChapters(backChapters.data?.chapters)
      }
    } catch (error) {
      console.log(error.message)
      showError('Error while fetching the chapters');
    }
    finally {
      setLoading(false);
    }

  }

  const getChaptersByUser = async () => {
    setLoading(true);
    try {
      const userChapters = await getAllChaptersByUser();

      if (userChapters.success) {
        setChapters(userChapters.data?.chapters)
      }

    } catch (error) {
      console.log(error.message);
      showError('Error while fetching the chapters');
    }
    finally {
      setLoading(false);
    }
  }

  // get chapters from backend if there is book id available
  useEffect(() => {

    bookId ? getChapterFromBackend() : getChaptersByUser()

  }, [bookId])

  const tabOptions = [
    { label: "All Courses", count: chapters.length },
    { label: "Mids", count: chapters.filter(c => c.type === "Mid").length },
    { label: "Finals", count: chapters.filter(c => c.type === "Final").length },
    { label: "Complete", count: chapters.filter(c => c.isComplete).length },
    { label: "InComplete", count: chapters.filter(c => !c.isComplete).length },
    { label: "Favourite", count: chapters.filter(c => c.isFavourite).length },
  ];

  return (
    <div className=''>
      <div className='min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl'>

        {/* header */}
        <Header
          selected={selected}
          setSelected={setSelected}
          tabOptions={tabOptions}  // pass dynamic counts
          onCreateClick={() => {
            setIsDrawerOpen(true);
          }}
        />

        {/* cards container */}
        <CardsContainer bookId={bookId} fetchChapters={bookId ? getChapterFromBackend : getChaptersByUser} loading={loading} chapters={filteredChapters} setChapters={setChapters} />
      </div>

      {/* Drawer */}
      <CreateChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        chapters={chapters}
        setChapters={setChapters}
        fetchChapters={bookId ? getChapterFromBackend : getChaptersByUser}
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
