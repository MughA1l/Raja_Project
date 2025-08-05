import { Bell, Plus, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`w-10/12 pl-12 pr-8 py-4 bg-white/80 flex items-center justify-between fixed top-0 right-0 z-40 ${scrolled ? 'backdrop-blur-md bg-white/40 shadow-sm shadow-black/3 border-none' : 'border-b border-b-black/4'}`}>
            <h2 className='font-semibold text-2xl'>
                Dashboard
            </h2>

            <div className="flex items-center w-full max-w-md px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white focus-within:ring-2 focus-within:ring-light-pink">
                <Search className="text-light-pink mr-2 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Search Books, Chapters here..."
                    className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
            </div>

            <div className='flex items-center gap-6'>

                {/* Add new book button */}
                <button className='btn px-[12px] py-[10px] !rounded-xl btn-secondary duration-200 flex items-center shadow-md shadow-light-pink/50 gap-1 text-white font-medium !text-sm'>
                    {/* icon */}
                    <Plus size={20} color='white' />
                    <span>
                        Add new Book
                    </span>
                </button>

                <span className='size-9 flex items-center justify-center duration-200 hover:bg-black/3 rounded-full group'>
                    <Bell className='text-black/60 group-hover:text-black/70 size-6' />
                </span>

                {/* avatar */}
                <div className="avatar hover:opacity-85 cursor-pointer duration-100">
                    <div className="ring-secondary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                        <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;