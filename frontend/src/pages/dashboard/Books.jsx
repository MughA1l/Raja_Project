
import React from 'react'
import Header from '../../components/Books/Header';
import CardsContainer from '../../components/Books/CardsContainer';

const Books = () => {

  return (
    <div className=''>
      <div className='min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl'>

        {/* header */}
        <Header />

        {/* cards container */}
        <CardsContainer />

      </div>
    </div>
  )
}

export default Books;