import React from 'react'
import { books } from '../../placeholder/Books.data';
import Card from './Card';

const CardsContainer = () => {
  return (
    <div className='pt-10'>

      <div className='grid grid-cols-4 gap-3'>
        {
          books.map((singleBook, index) => {
            return <Card key={singleBook.Name + index} book={singleBook} />
          })
        }
      </div>

    </div>
  )
}

export default CardsContainer;