import React from 'react'
import Header from '../../components/Chapters/Header';
import CardsContainer from '../../components/Chapters/CardsContainer';

const Chapters = () => {
  return (
    <div className=''>
      <div className='min-h-screen max-h-fit w-full p-5 pt-8 bg-[#F7F7F7] rounded-xl'>

        {/* header */}
        <Header />

        {/* cards container */}
        <CardsContainer />

      </div>
    </div>
  )
}

export default Chapters;