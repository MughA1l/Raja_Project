import React, { useState } from "react";
import Header from "./Header";
import Videos from "@containers/Videos";
import ENHANCED from "@containers/ENHANCED";
import OCR from "@containers/OCR";

const TextContainer = ({ image, selectedImage, totalImages, className = "" }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className={`min-h-80 rounded-xl p-2 relative flex flex-col overflow-hidden ${className}`}>
      {/* header */}
      <div className="w-full flex items-center px-3 justify-between pt-4 shrink-0">
        <div className="w-9/12 font-semibold text-lg line-clamp-1">
          {image?.name}
        </div>
      </div>

      {/* main container to show the text and different components */}
      <div className="shrink-0">
        <Header selected={selected} setSelected={setSelected} />
      </div>

      {/* switch between OCR, Enhanced, and Videos */}
      <div className="p-4 pt-8 flex-1 overflow-y-auto custom-scrollbar">
        {selected === 0 && (
          <OCR ocr={image?.ocr || "No OCR data available"} />
        )}
        {selected === 1 && (
          <ENHANCED
            enhancedText={
              image?.enhancedText || "No enhanced text available"
            }
          />
        )}
        {selected === 2 && <Videos videosArr={image?.videos || []} />}
      </div>
    </div>
  );
};

export default TextContainer;
