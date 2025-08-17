
import React from 'react'
import Header from '../../components/Books/Header';
import CardsContainer from '../../components/Books/CardsContainer';
import CreateBookDrawer from '../../components/Books/CreateBookDrawer';
import { useState } from 'react';

const Books = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className=''>
      <div className='min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl'>

        {/* header */}
        <Header onCreateClick={() => setIsDrawerOpen(true)} />

        {/* cards container */}
        <CardsContainer />

      </div>

      {/* Drawer */}
      <CreateBookDrawer
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

export default Books;