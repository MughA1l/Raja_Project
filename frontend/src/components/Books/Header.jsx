import React, { useState, useRef, useEffect } from "react";
import { Plus, Search } from "lucide-react";

const Header = ({
  onCreateClick,
  selected,
  setSelected,
  tabOptions,
  filter,
  setFilter,
  title = "Welcome to Books Page",
}) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef([]);

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
    <div className="space-y-0">
      {/* Header with title and search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h3>

        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
          <div className="flex items-center justify-center flex-1 sm:flex-none sm:w-48 md:w-64 h-9 md:h-10 border border-black/10 focus-within:border-black/30 duration-200 shadow-black/5 bg-white rounded-full relative">
            <input
              type="text"
              className="focus-within:outline-none h-full w-full pl-3 pr-10 text-xs md:text-sm caret-black/60 text-black/80"
              placeholder="Search by name"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Search
              className="text-black/50 absolute right-2"
              size={18}
            />
          </div>

          {onCreateClick && (
            <button
              className="flex items-center justify-center gap-1 text-white bg-light-blue/95 hover:bg-light-blue/75 duration-200 cursor-pointer rounded-full shadow-sm px-3 py-2 md:py-[10px] text-xs md:text-sm font-medium whitespace-nowrap"
              onClick={onCreateClick}
            >
              <Plus size={16} color="white" />
              <span className="hidden sm:inline">Create Book</span>
              <span className="sm:hidden">Create</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs section with sliding underline */}
      <div className="relative border-b border-gray-200 pb-0 overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max">
          {tabOptions.map((option, index) => (
            <button
              key={index}
              ref={(el) => (tabRefs.current[index] = el)}
              className={`px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm font-medium relative cursor-pointer whitespace-nowrap ${selected === index
                ? "text-light-pink"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/40"
                }`}
              onClick={() => setSelected(index)}
            >
              <div className="flex items-center gap-1">
                <span>{option.label}</span>
                <span
                  className={`text-xs ${selected === index
                    ? "text-light-pink/90"
                    : "text-gray-400"
                    }`}
                >
                  ({option.count})
                </span>
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
