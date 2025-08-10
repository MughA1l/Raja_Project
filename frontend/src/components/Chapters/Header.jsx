import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';

const Header = () => {
  const [selected, setSelected] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef([]);

  const tabOptions = [
    { label: "All Courses", count: "03" },
    { label: "Mids", count: "04" },
    { label: "Finals", count: "06" },
    { label: "Complete", count: "20" },
    { label: "InComplete", count: "29" },
    { label: "Favourite", count: "06" },

  ];

  useEffect(() => {
    if (tabRefs.current[selected]) {
      const tabElement = tabRefs.current[selected];
      setUnderlineStyle({
        left: tabElement.offsetLeft,
        width: tabElement.offsetWidth,
        transition: 'all 300ms ease-in-out'
      });
    }
  }, [selected]);

  return (
    <div className='space-y-0 mb-10'>
      {/* Header with title and search */}
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-semibold text-gray-800'>Welcome to Chapters Page</h3>

        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-64 h-10 border border-black/10 focus-within:border-black/30 duration-200 shadow-black/5 bg-white rounded-full relative'>
            <input
              type="text"
              className='focus-within:outline-none h-full w-full pl-3 pr-10 text-sm caret-black/60 text-black/80'
              placeholder='Search by name'
            />
            <Search className='text-black/50 absolute right-2' size={20} />
          </div>

          <button className='flex items-center justify-center gap-1 text-white bg-light-blue/95 hover:bg-light-blue/75 duration-200 cursor-pointer rounded-full shadow-sm px-3 py-[10px] text-sm font-medium'>
            <Plus size={16} color='white' />
            <span>Create Chapter</span>
          </button>
        </div>
      </div>

      {/* Tabs section with sliding underline */}
      <div className='relative border-b border-gray-200 pb-0'>
        <div className='flex'>
          {tabOptions.map((option, index) => (
            <button
              key={index}
              ref={el => tabRefs.current[index] = el}
              className={`px-4 py-3 text-sm font-medium relative cursor-pointer ${selected === index
                  ? 'text-light-pink'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-white/40'
                }`}
              onClick={() => setSelected(index)}
            >
              <div className='flex items-center gap-1'>
                <span>{option.label}</span>
                <span className={`text-xs ${selected === index ? 'text-light-pink/90' : 'text-gray-400'
                  }`}>
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