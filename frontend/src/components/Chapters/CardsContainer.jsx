import React, { useState } from 'react'
import Card from './Card.jsx';
import ConfirmationModal from '../general/ConfirmationModal.jsx';
import { showSuccess } from '../../utils/toast.js';
import { toast } from 'react-toastify';
import { deleteChapter } from '../../api/services/chapterService.js';


const CardsContainer = ({ chapters, setChapters, loading, bookId, fetchChapters }) => {

  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleCardClick = (index) => {
    setOpenCardIndex(index === openCardIndex ? null : index);
  };

  const handleCloseOptions = () => {
    setOpenCardIndex(null);
  };

  const handleDeleteChapter = (chapter) => {
    setSelectedChapter(chapter);
    setIsDeleteModalOpen(true);
  };

  const onCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedChapter(null);
  };

  const onConfirm = async () => {
    try {
      if (selectedChapter) {
        const response = await deleteChapter(selectedChapter._id);
        if (response.success) {
          showSuccess('Chapter deleted successfully');
          setChapters((prev) => prev.filter((c) => c._id !== selectedChapter._id));
        }
      }
    } catch (error) {
      console.log('Error', error);
      toast.error('Failed to delete chapter');
    }
    setIsDeleteModalOpen(false);
    setSelectedChapter(null);
  };

  // if after loading no chapters found then show no chapters found
  if (chapters.length == 0 && !loading) {
    return <>
      No Chapters found!
    </>
  }

  return (
    <div className='pt-10 relative'>
      <div className='grid grid-cols-4 gap-3'>

        {!loading ? chapters.map((singleChapter, index) => (
          <Card
            key={index}
            chapter={singleChapter}
            bookId={bookId}
            showOptions={openCardIndex === index}
            onClick={() => handleCardClick(index)}
            onDelete={() => handleDeleteChapter(singleChapter)}
          />
        )) :
          Array.from({ length: 4 }).map((_, index) => <div key={index} className="col-span-1 h-72 mb-14 p-2 pb-3 bg-white shadow-md shadow-black/5 rounded-2xl relative">
            {/* Skeleton for image */}
            <div className='absolute left-1/2 -translate-x-1/2 -top-9 inset-x-0 h-40 w-11/12 rounded-2xl overflow-hidden shadow-md'>
              <div className="skeleton h-full w-full"></div>

              {/* Skeleton for mids/finals badge */}
              <div className="absolute bottom-3 left-3 px-6 py-2 rounded-xl">
                <div className="skeleton h-4 w-16 rounded-lg"></div>
              </div>

              {/* Skeleton for fav icon */}
              <span className="absolute top-2 right-3">
                <div className="skeleton h-7 w-7 rounded-full"></div>
              </span>
            </div>

            {/* Skeleton for content */}
            <div className='pt-32 px-1 h-full w-full flex flex-col justify-between'>
              <div>
                {/* Creation date */}
                <div className="skeleton h-3 w-20 mb-2"></div>
                {/* Title */}
                <div className="skeleton h-4 w-32 mb-1"></div>
                <div className="skeleton h-4 w-24"></div>
              </div>

              {/* Counts */}
              <div>
                <div className="flex items-center justify-between px-2">
                  <div className="skeleton h-4 w-10"></div>
                  <div className="skeleton h-4 w-10"></div>
                  <div className="skeleton h-4 w-10"></div>
                </div>

                {/* Progress bar */}
                <div className='w-full px-2 flex items-center gap-3 mt-2'>
                  <div className="skeleton h-3 w-11/12 rounded-full"></div>
                  <div className="skeleton h-3 w-8 rounded"></div>
                </div>
              </div>

              {/* Edit/Delete Options */}
              <div className="flex items-center justify-center absolute top-20 right-5 rounded-lg p-[9px]">
                <div className="skeleton h-4 w-4 rounded"></div>
              </div>
            </div>
          </div>
          )
        }
      </div>

      {/* overlay to show here */}
      {openCardIndex !== null && (
        <div
          className='h-screen cursor-pointer w-screen bg-transparent fixed z-20 inset-0'
          onClick={handleCloseOptions}
        ></div>
      )}

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title={`Are you sure you want to delete ${selectedChapter?.name} chapter?`}
        para="By deleting this chapter you will lose all the material inside including all the Images, OCR,Youtube Suggestions."
        onCancel={onCancel}
        onConfirm={onConfirm}
      />


    </div>
  )
}

export default CardsContainer;