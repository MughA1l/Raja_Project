import React, { useState } from "react";

const AllImagesContainer = ({
  allImages,
  selectedImage,
  setSelectedImage,
}) => {
  const [filter, setFilter] = useState("all");

  const filteredImages = allImages.filter((img) => {
    if (filter === "favourite") return img.isFavourite;
    if (filter === "completed") return img.isCompleted;
    return true; // for 'all'
  });

  return (
    <div className="col-span-6 w-full h-full bg-white rounded-xl p-2 space-y-3">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-2">
        {["all", "favourite", "completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-xl text-xs shadow-sm shadow-light-pink/20 text-white bg-light-pink capitalize font-medium transition duration-150 ${
              filter === type
                ? "opacity-100"
                : "opacity-60 hover:opacity-90"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Image Cards */}
      <div className="space-y-3 overflow-y-auto pr-1">
        {filteredImages.map((image, index) => {
          // Find the actual index in allImages array to match the selectedImage index
          const actualIndex = allImages.findIndex(
            (img) => img.name === image.name
          );

          const isSelected = selectedImage - 1 === actualIndex;

          return (
            <div
              key={index}
              onClick={() => setSelectedImage(actualIndex + 1)}
              className={`flex items-center w-full h-18 rounded-xl overflow-hidden border border-gray-100 cursor-pointer transition-opacity ${
                isSelected
                  ? "bg-dark-blue/5"
                  : "opacity-100 hover:opacity-90"
              }`}
            >
              {/* Image */}
              <div className="h-full w-20 flex-shrink-0 overflow-hidden">
                <img
                  src={image.url}
                  alt={image.name}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>

              {/* Text Info */}
              <div className="flex flex-col justify-between px-3 py-2 h-full line-clamp-1 break-all flex-grow">
                <div className="font-semibold text-sm text-gray-800 truncate">
                  {image.name}
                </div>
                <div className="text-xs text-gray-500">
                  Created At: {image.createdAt || "24 May, 2025"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllImagesContainer;
