
import React, { useEffect, useState } from 'react';
import Header from "@books/Header"; // Reusing the standardized header
import { getAllImages, deleteImage } from '@services/imageService';
import ImageModal from '../../components/Images/ImageModal';
import ImageCard from '../../components/Images/ImageCard';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import ConfirmationModal from "@general/ConfirmationModal.jsx";
import { showSuccess, showError } from "@utils/toast.js";

const Images = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Header filter states
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("");

  // Delete states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await getAllImages();
      setImages(response.data?.images || []);
      setFilteredImages(response.data?.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  useEffect(() => {
    if (!images) return;

    let result = images;

    // 1. Filter by Tab
    switch (selected) {
      case 1: // Favourite
        result = images.filter((img) => img.isFavourite);
        break;
      case 2: // Completed
        result = images.filter((img) => img.isCompleted);
        break;
      case 3: // Incomplete
        result = images.filter((img) => !img.isCompleted);
        break;
      default: // All
        result = images;
    }

    // 2. Filter by Search Text
    if (filter) {
      result = result.filter((img) =>
        img.name?.toLowerCase().includes(filter.toLowerCase())
      );
    }

    setFilteredImages(result);
  }, [selected, filter, images]);


  const tabOptions = [
    { label: "All Images", count: images.length },
    { label: "Favourite", count: images.filter(i => i.isFavourite).length },
    { label: "Completed", count: images.filter(i => i.isCompleted).length },
    { label: "Incomplete", count: images.filter(i => !i.isCompleted).length },
  ];

  const handleImageClick = (index) => {

    const selectedImg = filteredImages[index];
    const originalIndex = images.findIndex(i => i._id === selectedImg._id);

    setSelectedImageIndex(originalIndex);
    setIsModalOpen(true);
  };

  // Delete Handlers
  const handleDeleteClick = (image) => {
    setImageToDelete(image);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;
    setDeleteLoading(true);
    try {
      const response = await deleteImage(imageToDelete._id);
      if (response.success) {
        setImages(prev => prev.filter(i => i._id !== imageToDelete._id));
        showSuccess("Image deleted successfully");
      } else {
        showError("Failed to delete image");
      }
    } catch (error) {
      showError("Error deleting image");
    } finally {
      setDeleteLoading(false);
      setIsDeleteModalOpen(false);
      setImageToDelete(null);
    }
  };

  return (
    <div className="">
      <div className="max-h-fit min-h-screen w-full rounded-xl bg-[#F7F7F7] p-3 md:p-5 pt-3 md:pt-5">

        {/* Reusing App Header */}
        <Header
          title="Welcome to Images Page"
          tabOptions={tabOptions}
          filter={filter}
          setFilter={setFilter}

          selected={selected}
          setSelected={setSelected}
        />

        {/* Content */}
        <div className="pt-6 md:pt-10 relative">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <ImageCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 md:py-20 px-4">
              <div className="bg-light-pink/10 rounded-full p-4 md:p-6 mb-4 md:mb-6">
                <ImageIcon size={48} className="md:w-16 md:h-16 text-light-pink" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {filter ? "No matches found" : "No Images Available"}
              </h2>
              <p className="text-sm md:text-base text-gray-500 text-center max-w-md">
                {filter ? "Try adjusting your search." : "Process chapters to generate images."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredImages.map((image, index) => (
                <ImageCard
                  key={image._id}
                  image={image}
                  onClick={() => handleImageClick(index)}
                  onDelete={() => handleDeleteClick(image)}
                  setImages={setImages}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images} // Passing full list so user can navigate all. 
        // If we want to navigate only filtered, we'd pass filteredImages and adjust indices.
        initialIndex={selectedImageIndex}
        setImages={setImages}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title={`Delete Image?`}
        para="Are you sure you want to delete this image? This action cannot be undone."
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

// Skeleton Loading Component
const ImageCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-slate-100 animate-pulse">
    <div className="aspect-4/3 bg-slate-200"></div>
    <div className="p-3 space-y-2">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="flex items-center justify-between">
        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
          <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Images;
