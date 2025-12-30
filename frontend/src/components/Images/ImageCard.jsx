
import React, { useState } from "react";
import { Heart, Trash, ZoomIn } from "lucide-react";
import { formateDate } from "@utils/formateDate.js";
import { updateImage, deleteImage } from "@services/imageService.js";
import { showSuccess, showError } from "@utils/toast.js";

const ImageCard = ({
    image,
    onClick,
    onDelete,
    setImages,
}) => {
    const [isFav, setIsFav] = useState(image?.isFavourite || false);

    const handleFavClick = async (e) => {
        e.stopPropagation();
        const newFav = !isFav;
        setIsFav(newFav);

        // Optimistically update parent state if provided
        if (setImages) {
            setImages((prev) =>
                prev.map((img) =>
                    img._id === image._id ? { ...img, isFavourite: newFav } : img
                )
            );
        }

        try {
            const response = await updateImage(image._id, {
                isFavourite: newFav,
            });
            if (!response.success) {
                // Rollback
                setIsFav(!newFav);
                if (setImages) {
                    setImages((prev) =>
                        prev.map((img) =>
                            img._id === image._id ? { ...img, isFavourite: !newFav } : img
                        )
                    );
                }
                showError("Failed to update favorite status");
            } else {
                // showSuccess(newFav ? "Added to favorites" : "Removed from favorites");
            }
        } catch (error) {
            console.log(error);
            setIsFav(!newFav);
            if (setImages) {
                setImages((prev) =>
                    prev.map((img) =>
                        img._id === image._id ? { ...img, isFavourite: !newFav } : img
                    )
                );
            }
        }
    };

    if (!image) return null;

    return (
        <div
            className="bg-white col-span-1 rounded-2xl border border-black/6 h-80 p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 mb-3 relative group"
            onClick={onClick}
        >
            {/* image */}
            <div className="h-4/5 w-full rounded-2xl overflow-hidden relative bg-gray-50">
                <img
                    src={image.url}
                    className="object-cover h-full w-full"
                    alt={image.name}
                    loading="lazy"
                />

                {/* Favorite Button */}
                <span className="absolute top-2 right-3 z-10 p-1.5 rounded-full bg-white/60 hover:bg-white backdrop-blur-sm transition-all duration-200" onClick={handleFavClick}>
                    <Heart
                        className={`transition-colors duration-200 ${isFav ? "fill-light-pink text-light-pink" : "text-gray-500 hover:text-light-pink"}`}
                        size={20}
                    />
                </span>

                {/* Overlay Actions (Visible on Hover) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 p-2 rounded-full shadow-sm">
                        <ZoomIn size={24} className="text-dark-blue" />
                    </div>
                </div>
            </div>

            {/* content section */}
            <div className="pt-3 px-2 pb-1 flex flex-col justify-between h-1/5">
                <div className="flex justify-between items-start">
                    <div className="overflow-hidden">
                        <div className="font-semibold text-sm line-clamp-1 w-full break-all text-gray-800" title={image.name}>
                            {image.name}
                        </div>
                        <div className="text-[11px] text-black/40 font-medium mt-0.5">
                            {formateDate(image?.createdAt)}
                        </div>
                    </div>

                    {/* Delete Option - visible on hover or always if needed, keeping mostly clean */}
                    <button
                        className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(image);
                        }}
                    >
                        <Trash size={16} />
                    </button>
                </div>
            </div>

            {/* Date badge or other info could go here matching Books card style */}
        </div>
    );
};

export default ImageCard;
