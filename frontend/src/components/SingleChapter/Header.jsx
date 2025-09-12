import React, { useState, useRef, useEffect } from "react";
import { Plus, Search } from "lucide-react";

const Header = ({ selected, setSelected }) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef([]);

  const tabOptions = [
    { label: "OCR" },
    { label: "Enhanced AI Text" },
    { label: "Youtube Videos" },
  ];

  useEffect(() => {
    if (tabRefs.current[selected]) {
      const tabElement = tabRefs.current[selected];
      setUnderlineStyle({
        left: tabElement.offsetLeft,
        width: tabElement.offsetWidth,
        transition: "all 300ms ease-in-out",
      });
    }
  }, [selected]);

  return (
    <div className="space-y-0 pt-5">
      {/* Tabs section with sliding underline */}
      <div className="relative border-b border-gray-200 pb-0">
        <div className="flex gap-2">
          {tabOptions.map((option, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              className={`px-4 py-3 text-sm font-medium relative cursor-pointer ${
                selected === index
                  ? "text-light-pink"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white/40"
              }`}
              onClick={() => setSelected(index)}
            >
              <div className="flex items-center gap-1">
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
        <div
          className="absolute bottom-0 h-0.5 bg-light-pink transition-all duration-300"
          style={underlineStyle}
        />
      </div>
    </div>
  );
};

export default Header;
