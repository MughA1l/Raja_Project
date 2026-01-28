import React from "react";
import { ListEnd } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formateDate } from "@utils/formateDate.js";

const RecentBookCard = ({ book }) => {
  const navigate = useNavigate();

  if (!book) return null;

  return (
    <div
      className="bg-white col-span-1 rounded-2xl border border-black/6 p-3 cursor-pointer hover:shadow-md transition-all duration-200 flex gap-3"
      onClick={() => navigate(`/Books/${book?._id}/Chapters`)}
    >
      {/* Image */}
      <div className="h-20 w-20 min-w-20 rounded-xl overflow-hidden">
        <img
          src={book.image}
          className="object-cover h-full w-full"
          alt={book.name}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="font-semibold text-sm line-clamp-1 text-dark-blue">
          {book.name}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <ListEnd className="text-black/50" size={14} />
          <span className="text-xs text-black/60">
            {book.chaptersCount} Chapters
          </span>
        </div>
        <div className="text-[10px] text-black/40 mt-1">
          Updated {formateDate(book?.updatedAt)}
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-start">
        <span
          className={`px-2 py-1 rounded-lg text-[10px] font-medium ${
            book.isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {book.isCompleted ? "Complete" : "In Progress"}
        </span>
      </div>
    </div>
  );
};

export default RecentBookCard;
