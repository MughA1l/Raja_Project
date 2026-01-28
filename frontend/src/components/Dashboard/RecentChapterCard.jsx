import React from "react";
import { Image as ImageIcon, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formateDate } from "@utils/formateDate.js";

const RecentChapterCard = ({ chapter }) => {
  const navigate = useNavigate();

  if (!chapter) return null;

  return (
    <div
      className="bg-white col-span-1 rounded-2xl border border-black/6 p-3 cursor-pointer hover:shadow-md transition-all duration-200 flex gap-3"
      onClick={() => navigate(`/Chapters/${chapter?._id}/Preview`)}
    >
      {/* Image */}
      <div className="h-20 w-20 min-w-20 rounded-xl overflow-hidden">
        <img
          src={chapter.image}
          className="object-cover h-full w-full"
          alt={chapter.name}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="font-semibold text-sm line-clamp-1 text-dark-blue">
          {chapter.name}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <BookOpen className="text-black/50" size={12} />
            <span className="text-[11px] text-black/60 line-clamp-1">
              {chapter.bookName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <ImageIcon className="text-black/50" size={12} />
            <span className="text-[11px] text-black/60">
              {chapter.imagesCount} Images
            </span>
          </div>
          {chapter.isMids && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-light-pink/10 text-light-pink">
              Mids
            </span>
          )}
        </div>
        <div className="text-[10px] text-black/40 mt-1">
          Updated {formateDate(chapter?.updatedAt)}
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-start">
        <span
          className={`px-2 py-1 rounded-lg text-[10px] font-medium ${
            chapter.isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {chapter.isCompleted ? "Complete" : "In Progress"}
        </span>
      </div>
    </div>
  );
};

export default RecentChapterCard;
