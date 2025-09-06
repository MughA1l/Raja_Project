import React, { useState } from 'react'
import Card from './Card.jsx';
import ConfirmationModal from '../general/ConfirmationModal.jsx';
import { showSuccess } from '../../utils/toast.js';
import { toast } from 'react-toastify';
import { deleteChapter } from '../../api/services/chapterService.js';


const CardsContainer = ({ chapters, setChapters }) => {

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
  if (chapters.length == 0) {
    return <>
      No Chapters found!
    </>
  }

  return (
    <div className='pt-10 relative'>
      <div className='grid grid-cols-4 gap-3'>

        {chapters.map((singleChapter, index) => (
          <Card
            key={index}
            chapter={singleChapter}
            showOptions={openCardIndex === index}
            onClick={() => handleCardClick(index)}
            onDelete={() => handleDeleteChapter(singleChapter)}
          />
        ))}
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