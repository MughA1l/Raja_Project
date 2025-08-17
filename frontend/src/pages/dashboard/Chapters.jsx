import React, { useEffect, useState } from 'react'
import Header from '../../components/Chapters/Header';
import CardsContainer from '../../components/Chapters/CardsContainer';
import CreateChapterDrawer from '../../components/Chapters/CreateChapterDrawer';
import { useLocation, useParams } from 'react-router-dom';

const Chapters = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { state } = useLocation();

  const [chapters, setChapters] = useState(state?.chapters);

  const bookId = useParams();
  console.log(chapters);

  if (!chapters) <div>
    No chapters found.
  </div>

  return (
    <div className=''>
      <div className='min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl'>

        {/* header */}
        <Header onCreateClick={() => setIsDrawerOpen(true)} />

        {/* cards container */}
        <CardsContainer chapters={chapters}/>

      </div>
      {/* Drawer */}
      <CreateChapterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* overlay */}
      {isDrawerOpen && <div className="absolute inset-0 h-screen w-screen z-0 bg-black/30"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      ></div>}

    </div>
  )
}

export default Chapters;