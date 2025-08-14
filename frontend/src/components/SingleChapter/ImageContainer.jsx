import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ChevronRight, ChevronLeft, Maximize, Check, X } from 'lucide-react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageContainer = ({ selectedImage, setSelectedImage, image, totalImages }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [direction, setDirection] = useState(0);
    const transformRef = useRef(null);

    const handleNext = () => {
        if (selectedImage < totalImages) {
            setDirection(1);
            setSelectedImage(selectedImage + 1);
        }
    };

    const handlePrevious = () => {
        if (selectedImage > 1) {
            setDirection(-1);
            setSelectedImage(selectedImage - 1);
        }
    };

    const handleToggleFavorite = () => {
        console.log("Toggling favorite for image:", image.name);
    };

    const handleToggleCompleted = () => {
        console.log("Toggling completion status for image:", image.name);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(true);
    };

    const exitFullscreen = () => {
        setIsFullscreen(false);
        if (transformRef.current?.resetTransform) transformRef.current.resetTransform();
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
        }),
        center: {
            x: 0,
            opacity: 1,
            position: 'relative',
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute',
        }),
    };

    const renderZoomableImage = () => (
        <TransformWrapper initialScale={0.5} minScale={0.5} maxScale={5}>
            <TransformComponent>
                <img
                    src={image?.url}
                    alt={image?.name}
                    className="w-full object-contain rounded-lg"
                    style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        height: '100%',
                        userSelect: 'none',
                        display: 'block',
                    }}
                    draggable={false}
                />
            </TransformComponent>
        </TransformWrapper>
    );

    return (
        <>
            <div className='relative flex flex-col items-center rounded-xl p-2 overflow-hidden border-rose-50' style={{ height: '479px' }}>
                <button
                    onClick={handleToggleFavorite}
                    className="absolute left-3 top-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white/80 transition-colors duration-200"
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
                            ? 'bg-green-400 text-white'
                            : 'bg-green-300/10 text-gray-400 hover:bg-white/80'
                    }`}
                >
                    <Check size={15} className={image?.isCompleted ? "stroke-white stroke-5" : "stroke-4 stroke-black/40"} />
                </button>

                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs bg-white/90 text-black px-3 py-1 rounded-full shadow z-10">
                    {selectedImage} / {totalImages}
                </div>

                <div className='flex-grow w-full h-full flex items-center justify-center overflow-hidden relative'>
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={image?.url}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {renderZoomableImage()}
                        </motion.div>
                    </AnimatePresence>
                </div>

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

                <button
                    onClick={toggleFullscreen}
                    className="absolute right-3 bottom-3 z-10 p-2 rounded-full bg-dark-blue/3 hover:bg-dark-blue/8 transition-colors duration-200 text-dark-blue/70 hover:text-dark-blue/90"
                >
                    <Maximize size={22} />
                </button>
            </div>

            {isFullscreen && (
                <div className="fixed inset-0 bg-black z-50 flex flex-col">
                    <div className="flex justify-between items-center px-5 py-3 bg-black/70 z-50">
                        <button
                            onClick={exitFullscreen}
                            className="p-2 rounded-full bg-white hover:bg-white/80 text-black shadow"
                            aria-label="Close fullscreen"
                        >
                            <X size={22} />
                        </button>
                        <div className="text-white text-xs px-4 py-1 rounded-full bg-white/10">
                            {selectedImage} / {totalImages}
                        </div>
                        <div style={{ width: 40 }} />
                    </div>

                    <div className="relative flex-grow flex items-center justify-center overflow-hidden">
                        <button
                            onClick={handlePrevious}
                            disabled={selectedImage === 1}
                            className="absolute left-5 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed z-50"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={30} />
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={selectedImage === totalImages}
                            className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed z-50"
                            aria-label="Next image"
                        >
                            <ChevronRight size={30} />
                        </button>

                        <div className="absolute -top-0 left-5 flex flex-col gap-2 z-50">
                            <button
                                onClick={() => transformRef.current?.zoomIn()}
                                className="p-2 bg-white hover:bg-white/80 border border-black/20 text-black rounded-full shadow"
                                title="Zoom In"
                                aria-label="Zoom In"
                            >
                                +
                            </button>
                            <button
                                onClick={() => transformRef.current?.zoomOut()}
                                className="p-2 bg-white hover:bg-white/80 border border-black/20 text-black rounded-full shadow"
                                title="Zoom Out"
                                aria-label="Zoom Out"
                            >
                                −
                            </button>
                            <button
                                onClick={() => transformRef.current?.resetTransform()}
                                className="p-2 bg-white hover:bg-white/80 border border-black/20 text-black rounded-full shadow"
                                title="Reset"
                                aria-label="Reset Zoom"
                            >
                                ⟳
                            </button>
                        </div>

                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={image?.url}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="max-w-full max-h-full flex items-center justify-center relative"
                                style={{ width: '100%', height: '100%' }}
                            >
                                <TransformWrapper
                                    initialScale={1}
                                    minScale={0.5}
                                    maxScale={5}
                                    ref={transformRef}
                                >
                                    {({ zoomIn, zoomOut, resetTransform }) => {
                                        transformRef.current = { zoomIn, zoomOut, resetTransform };
                                        return (
                                            <TransformComponent>
                                                <img
                                                    src={image?.url}
                                                    alt={image?.name}
                                                    style={{
                                                        maxHeight: '88vh',
                                                        maxWidth: '100vw',
                                                        objectFit: 'contain',
                                                        userSelect: 'none',
                                                        display: 'block',
                                                        margin: '0 auto',
                                                    }}
                                                    draggable={false}
                                                />
                                            </TransformComponent>
                                        );
                                    }}
                                </TransformWrapper>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageContainer;
