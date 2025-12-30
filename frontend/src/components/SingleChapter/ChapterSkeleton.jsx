import React from "react";

const ChapterSkeleton = () => {
  return (
    <div className="min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl animate-pulse">
      <div className="grid grid-cols-20 gap-3">
        {/* Main content area skeleton */}
        <div className="col-span-14 w-full h-full bg-white rounded-xl">
          {/* Image container skeleton */}
          <div
            className="relative flex flex-col items-center rounded-xl p-2 overflow-hidden"
            style={{ height: "479px" }}
          >
            {/* Action buttons skeleton */}
            <div className="absolute left-3 top-3 z-10 w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="absolute right-12 top-3.5 z-10 w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-gray-200"></div>

            {/* Counter skeleton */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-6 w-16 bg-gray-200 rounded-full"></div>

            {/* Main image skeleton */}
            <div className="flex-grow w-full h-full flex items-center justify-center">
              <div className="w-full h-full bg-gray-300 rounded-lg"></div>
            </div>

            {/* Navigation buttons skeleton */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-200"></div>

            {/* Fullscreen button skeleton */}
            <div className="absolute right-3 bottom-3 z-10 w-10 h-10 rounded-full bg-gray-200"></div>
          </div>

          {/* OCR and text container skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        {/* Sidebar images skeleton */}
        <div className="col-span-6 w-full h-full bg-white rounded-xl p-2 space-y-3">
          {/* Filter Tabs Skeleton */}
          <div className="flex gap-2 mb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-9 bg-gray-200 rounded-xl flex-1"
              ></div>
            ))}
          </div>

          {/* Image Cards Skeleton */}
          <div className="space-y-3 pr-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterSkeleton;
