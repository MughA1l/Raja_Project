
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import SingleImageContainer from '../SingleChapter/ImageContainer';
import TextContainer from '../SingleChapter/TextContainer';

const ImageModal = ({ isOpen, onClose, images, initialIndex = 0, setImages }) => {
    const [selectedImage, setSelectedImage] = useState(initialIndex + 1); // 1-based index for compatibility

    useEffect(() => {
        if (isOpen) {
            setSelectedImage(initialIndex + 1);
        }
    }, [isOpen, initialIndex]);

    if (!isOpen) return null;

    // Handle case where images might be empty or index out of bounds due to deletion
    const currentImageIndex = selectedImage - 1;
    const currentImage = images[currentImageIndex];

    if (!currentImage && images.length > 0) {
        // Adjustment if we deleted the last item
        if (selectedImage > images.length) {
            setSelectedImage(images.length);
            return null;
        }
    }

    if (!currentImage) return null; // Should ideally show empty state or close

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-7xl h-[90vh] bg-[#F7F7F7] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-[60] p-1.5 rounded-full bg-black/5 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="flex-1 overflow-hidden px-6 pt-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Column: Image Container */}
                    <div className="flex flex-col gap-4 h-full pb-4 min-h-0">
                        <div className="bg-white rounded-xl shadow-sm h-full">
                            <SingleImageContainer
                                selectedImage={selectedImage}
                                setSelectedImage={setSelectedImage}
                                image={currentImage}
                                totalImages={images.length}
                                setImages={setImages}
                            />
                        </div>
                    </div>

                    {/* Right Column: Text Container */}
                    <div className="flex flex-col gap-4 h-full pb-4 min-h-0">
                        <div className="bg-white rounded-xl shadow-sm h-full overflow-hidden">
                            <TextContainer
                                image={currentImage}
                                selectedImage={selectedImage}
                                totalImages={images.length}
                                className="h-full"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ImageModal;
