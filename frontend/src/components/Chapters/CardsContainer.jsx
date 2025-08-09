import React from 'react'
import Card from './Card.jsx';
import { chapters } from '../../placeholder/ChapterData.js';

const CardsContainer = () => {
    return (
        <div className='pt-10 relative'>
            <div className='grid grid-cols-4 gap-3'>
                {chapters.map((singleChapter, index) => (
                    <Card
                        key={index}
                        chapter={singleChapter}
                    />
                ))}
            </div>
        </div>
    )
}

export default CardsContainer;