import React, { useState } from 'react'
import Card from './Card.jsx';
import { chapters } from '../../placeholder/ChapterData.js';

const CardsContainer = () => {
    const [openCardIndex, setOpenCardIndex] = useState(null);

    const handleCardClick = (index) => {
        setOpenCardIndex(index === openCardIndex ? null : index);
    };

    const handleCloseOptions = () => {
        setOpenCardIndex(null);
    };
    return (
        <div className='pt-10 relative'>
            <div className='grid grid-cols-4 gap-3'>

                {chapters.map((singleChapter, index) => (
                    <Card
                        key={index}
                        chapter={singleChapter}
                        showOptions={openCardIndex === index}
                        onClick={() => handleCardClick(index)}
                    />
                ))}
            </div>

            {/* overaly to show here */}
            {openCardIndex !== null && (
                <div
                    className='h-screen cursor-pointer w-screen bg-transparent fixed z-20 inset-0'
                    onClick={handleCloseOptions}
                ></div>
            )}
        </div>
    )
}

export default CardsContainer;