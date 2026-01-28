import React from "react";
import { TrendingUp } from "lucide-react";

const ProgressCard = ({ statistics }) => {
  const { books, chapters, images, overall } = statistics;

  return (
    <div className="bg-gradient-to-br from-dark-blue to-light-blue rounded-2xl p-4 md:p-6 text-white col-span-1 sm:col-span-2">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold">Overall Progress</h3>
          <p className="text-white/70 text-xs md:text-sm">Your study completion rate</p>
        </div>
        <div className="p-2 md:p-3 bg-white/10 rounded-xl">
          <TrendingUp size={20} className="md:w-6 md:h-6" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3 md:mb-4">
        <div className="flex justify-between text-xs md:text-sm mb-2">
          <span className="text-white/80">Completed</span>
          <span className="font-bold">{overall.progress}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 md:h-3">
          <div
            className="bg-light-pink h-2 md:h-3 rounded-full transition-all duration-500"
            style={{ width: `${overall.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats breakdown */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
        <div className="text-center">
          <div className="text-lg md:text-2xl font-bold">{books.completed}/{books.total}</div>
          <div className="text-[10px] md:text-xs text-white/70">Books</div>
        </div>
        <div className="text-center border-x border-white/20">
          <div className="text-lg md:text-2xl font-bold">{chapters.completed}/{chapters.total}</div>
          <div className="text-[10px] md:text-xs text-white/70">Chapters</div>
        </div>
        <div className="text-center">
          <div className="text-lg md:text-2xl font-bold">{images.completed}/{images.total}</div>
          <div className="text-[10px] md:text-xs text-white/70">Images</div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
