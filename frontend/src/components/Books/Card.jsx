/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Heart, ListEnd, PencilLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formateDate } from "../../utils/formateDate.js";
import { updateBook } from "../../api/services/bookService.js";

const Card = ({
  book,
  showOptions,
  onClick,
  onDelete,
  onEdit,
  setBooks,
}) => {
  const navigate = useNavigate();

  const [isFav, setIsFav] = useState(book.isFavourite);

  const handleFavClick = async (e) => {
    e.stopPropagation();
    const newFav = !isFav;
    setIsFav(newFav);

    // update parent instantly
    setBooks((prev) =>
      prev.map((b) =>
        b._id === book._id ? { ...b, isFavourite: newFav } : b
      )
    );

    try {
      const updation = await updateBook(book._id, {
        isFavourite: newFav,
      });
      if (!updation.success) {
        // rollback on failure
        setIsFav(book.isFavourite);
        setBooks((prev) =>
          prev.map((b) =>
            b._id === book._id
              ? { ...b, isFavourite: book.isFavourite }
              : b
          )
        );
      }
    } catch (error) {
      console.log(error);
      setIsFav(book.isFavourite);
      setBooks((prev) =>
        prev.map((b) =>
          b._id === book._id
            ? { ...b, isFavourite: book.isFavourite }
            : b
        )
      );
    }
  };

  if (!book) return null;

  return (
    <div
      className={`bg-white col-span-1 rounded-2xl border border-black/6 h-80 p-2 cursor-pointer ${!showOptions ? "hover:scale-105 ease-in-out duration-300" : ""} ease-in-out duration-300 mb-3 relative`}
      onClick={() => {
        navigate(`/Books/${book?._id}/Chapters`);
      }}
    >
      {/* image */}
      <div className="h-7/12 w-full rounded-2xl overflow-hidden relative">
        <img
          src={book.image}
          className="object-cover h-full w-full"
          alt="chapter Image"
        />
        <span className="absolute top-2 right-3">
          <Heart
            className={`text-light-pink/80 duration-200 ${isFav ? "fill-light-pink" : " hover:fill-light-pink/30"}`}
            size={26}
            onClick={handleFavClick}
          />
        </span>
      </div>

      {/* content section */}
      <div className="pt-5 px-2 pb-2">
        <div className="text-[11px] text-black/40 font-medium">
          {formateDate(book?.createdAt)}
        </div>
        <div className="font-semibold pt-1 line-clamp-1 w-full break-all">
          {book.name}
        </div>
        <div className="flex items-center gap-1 pt-1 font-medium">
          <ListEnd className="text-black/60" size={16} />
          <div className="text-xs">
            {book?.chapters?.length}&nbsp;
            <span>Chapters</span>
          </div>
        </div>
      </div>

      {/* slider */}
      <div className="w-full px-2 flex items-center gap-2">
        <progress
          className="progress progress-secondary w-7/12"
          value={book.completionPercentage || 20}
          max="100"
        ></progress>
        <span className="text-sm font-semibold">
          {book.completionPercentage || 20}%
        </span>
      </div>

      {/* edit/delete options */}
      <div
        className="flex items-center justify-center absolute bottom-4 right-3 rounded-xl p-[9px] bg-dark-blue/90 hover:bg-dark-blue duration-100 z-50"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        <PencilLine size={16} color="white" />
        {showOptions && (
          <div className="absolute z-50 -top-16 w-fit -left-20 shadow-md border border-black/10 bg-white text-sm rounded-xl flex flex-col items-start justify-start font-medium text-dark-blue">
            <span
              className="w-full px-6 py-[7px] border-b border-black/10 hover:opacity-60 duration-100"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(book);
              }}
            >
              Edit
            </span>
            <span
              className="px-6 py-[7px]
                             border-b border-black/10 hover:opacity-60 duration-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              Delete
            </span>
          </div>
        )}
      </div>

      {/* complete/incomplete */}
      <div className="absolute top-5 left-4 px-2 py-1 rounded-xl bg-[#f5f5f5] text-[12px] font-medium">
        {book.isCompleted ? "Complete" : "Incomplete"}
      </div>
    </div>
  );
};

export default Card;
