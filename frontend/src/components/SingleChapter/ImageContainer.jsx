import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ChevronRight, ChevronLeft, Maximize, Check, CircleCheck } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { motion, AnimatePresence } from 'framer-motion';

const ImageContainer = ({ selectedImage, setSelectedImage, image, totalImages }) => {
    const [direction, setDirection] = React.useState(0); // Track animation direction
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    const handleNext = () => {
        if (selectedImage < totalImages) {
            setDirection(1);
            setSelectedImage(selectedImage + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedImage > 0) {
            setDirection(-1);
            setSelectedImage(selectedImage - 1);
        }
    };

    const handleToggleFavorite = () => {
        // Your logic to toggle favorite status
        console.log("Toggling favorite for image:", image.name);
    };

    const handleToggleCompleted = () => {
        // Your logic to toggle completed status
        console.log("Toggling completion status for image:", image.name);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // Animation variants
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
            }
        })
    };

    return (
        <div className='relative h-92 md:h-[479px] flex flex-col items-center rounded-xl p-2 shadow-none overflow-hidden border-rose-50'>
            {/* Favorite Heart Icon */}
            <button
                onClick={handleToggleFavorite}
                className="absolute left-3 top-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
            >
                {image?.isFavourite ? (
                    <FaHeart className="text-light-pink" size={20} />
                ) : (
                    <FaRegHeart className="text-dark-blue/50" size={20} />
                )}
            </button>
            <button
            onClick={handleToggleCompleted}
            className={`absolute right-4 top-4 z-10 p-1 rounded-full transition-all duration-200 ${
                image?.isCompleted
                    ? 'bg-green-400 text-white' // Checked state
                    : 'bg-green-300/10 text-gray-400 hover:bg-white' // Unchecked state
            }`}
        >
            {image?.isCompleted ? (
                <Check size={15} className="stroke-white stroke-5" />
            ) : (
                <Check size={15} className='stroke-4 stroke-black/40'/>
            )}
        </button>

            {/* Main Image View with Zoom, Pan and Animation */}
            <div className='flex-grow w-full h-full flex items-center justify-center overflow-hidden relative'>
                <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                        key={selectedImage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute w-full h-full flex items-center justify-center"
                    >
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.5}
                            maxScale={5}
                        >
                            <TransformComponent>
                                <img
                                    src={image?.url}
                                    alt={image?.name}
                                    className='max-w-full h-full max-h-[479px] rounded-lg'
                                />
                            </TransformComponent>
                        </TransformWrapper>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrevious}
                disabled={selectedImage === 1}
                className='absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-dark-blue bg-dark-blue/5 hover:bg-dark-blue/10 duration-100 transition-colors opacity-50 disabled:cursor-not-allowed'
            >
                <ChevronLeft size={27} />
            </button>
            <button
                onClick={handleNext}
                disabled={selectedImage === totalImages}
                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-dark-blue bg-dark-blue/5 hover:bg-dark-blue/10 duration-100 transition-colors opacity-50 disabled:cursor-not-allowed'
            >
                <ChevronRight size={27} />
            </button>

            {/* Fullscreen Button */}
            <button
                onClick={toggleFullscreen}
                className="absolute right-3 bottom-3 z-10 p-2 rounded-full bg-dark-blue/2 hover:bg-dark-text-dark-blue/10 transition-colors duration-200 text-dark-blue/70 hover:text-dark-blue/90"
            >
                <Maximize size={22} />
            </button>

            {/* to show the name of the image and add image button */}
            <div className="flex items-center">

            </div>
        </div>
    );
};

export default ImageContainer;