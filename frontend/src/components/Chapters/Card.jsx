import React, { useState } from "react";
import {
  FileText,
  Heart,
  ImageDown,
  PencilLine,
  ScanText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formateDate } from "@utils/formateDate.js";
import { updateChapter } from "@services/chapterService.js";

const Card = ({
  chapter,
  showOptions,
  onClick,
  onDelete,
  bookId,
  setChapters,
}) => {
  const [isFav, setIsFav] = useState(
    chapter.isFavourite ? chapter.isFavourite : false
  );
  const navigate = useNavigate();

  if (!chapter) return null;

  const handleDeleteChapter = () => {
    onDelete();
  };

  const handleLikeChapter = async (chapter) => {
    try {
      setIsFav(!isFav);

      setChapters((prev) =>
        prev.map((c) =>
          c._id === chapter._id ? { ...c, isFavourite: !isFav } : c
        )
      );

      // Call API in background
      await updateChapter(chapter._id, { isFavourite: !isFav });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`${!showOptions ? "hover:scale-105 ease-in-out duration-300" : ""} col-span-1 ${!bookId ? "h-76" : "h-72"} mb-14 p-2 pb-3 bg-white shadow-md shadow-black/5 rounded-2xl relative cursor-pointer`}
      onClick={() =>
        navigate(`/Chapters/${chapter?._id}`, {
          state: { images: chapter?.images },
        })
      }
    >
      {/* div to show the image */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-9 inset-x-0 h-40 w-11/12 rounded-2xl overflow-hidden shadow-md">
        <img
          src={chapter?.image ? chapter?.image : "/9264822.jpg"}
          className={`h-full w-full ${chapter?.image ? "object-cover" : "object-contain"}`}
          alt="chapter-image"
        />
        {/* to show complete/ incomplete */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white text-[12px] font-medium ">
          {chapter?.isMids ? "mids" : "finals"}
        </div>

        <span className="absolute top-2 right-3">
          <Heart
            className={`text-light-pink/80 duration-200 ${chapter?.isFavourite ? "fill-light-pink" : " hover:fill-light-pink/30"}`}
            size={26}
            onClick={(e) => {
              e.stopPropagation();
              handleLikeChapter(chapter);
            }}
          />
        </span>
      </div>

      {/* to show the content of the chapter card */}
      <div className="pt-32 px-1 h-full w-full flex flex-col justify-between">
        {/* to show the creation date */}
        <div>
          <div className="text-[11px] text-black/40 font-medium">
            {formateDate(chapter?.createdAt)}
          </div>
          {/* show the title */}
          <div className="font-semibold pt-1 line-clamp-2 w-full break-all">
            {chapter?.name}
          </div>
          {!bookId && (
            <div className="text-[12px] text-pink-500 rounded-full line-clamp-1 w-fit font-medium break-all">
              {chapter?.bookId?.name}
            </div>
          )}
        </div>

        {/* to show the counts */}
        <div>
          <div className="flex items-center justify-between px-2">
            <span className="text-black/60 flex items-center justify-center gap-1">
              <ImageDown size={18} />
              <span className="text-sm font-medium">
                {chapter?.images?.length}
              </span>
            </span>

            <span className="text-black/60 flex items-center justify-center py-3 gap-1">
              <FileText size={18} />
              <span className="text-sm font-medium">
                {chapter?.images?.length}
              </span>
            </span>

            <span className="text-black/60 flex items-center justify-center py-3 gap-1">
              <ScanText size={18} />
              <span className="text-sm font-medium">
                {chapter?.images?.length}
              </span>
            </span>
          </div>

          {/* start and progress */}
          <div className="w-full px-2 flex items-center gap-3">
            <progress
              className="progress progress-secondary w-11/12"
              value={
                chapter.completionPercentage
                  ? chapter.completionPercentage
                  : 0
              }
              max="100"
            ></progress>
            <span className="text-sm font-semibold">
              {chapter.completionPercentage
                ? chapter.completionPercentage
                : 0}
              %
            </span>
          </div>
        </div>

        {/* edit/delete options */}
        <div
          className="flex items-center justify-center absolute top-20 right-5 rounded-lg p-[9px] bg-white hover:opacity-90 duration-100 z-50"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          <PencilLine size={15} color="black" />
          {showOptions && (
            <div className="absolute z-50 -top-16 w-fit -left-20 shadow-md border border-black/10 bg-white text-sm rounded-xl flex flex-col items-start justify-start font-medium text-dark-blue">
              <span className="w-full px-6 py-[7px] border-b border-black/10 hover:opacity-60 duration-100">
                Edit
              </span>
              <span
                className="px-6 py-[7px] border-b border-black/10 hover:opacity-60 duration-100"
                onClick={handleDeleteChapter}
              >
                Delete
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
