import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';

const Header = () => {
    const [selected, setSelected] = useState(0);
    const options = [
        "All Books",
        "Favourite",
        "Completed",
        "Incomplete"
    ]
    return (
        <div className='flex items-center justify-between'>

            <div className='space-x-1'>

                {
                    options.map((single, index) => {
                        return <span className={`${selected == index ? 'text-white bg-light-pink hover:bg-light-pink/85 border border-light-pink' : 'bg-white hover:bg-white/60 shadow-xs border border-black/7'} text-xs font-medium  duration-200 cursor-pointer px-3 py-[10px] rounded-full`}
                            onClick={() => setSelected(index)}
                        >
                            {single} <span className={`text-[10px] ${selected == index ? 'text-white' : 'text-black/60'}`}>(30)</span>
                        </span>
                    })
                }

            </div>

            <div className='flex gap-4'>

                <div className='flex items-center justify-center w-64 border border-black/10 focus-within:border-black/30 duration-200 shadow-black/5 bg-white rounded-full relative'>
                    <input type="text" className='focus-within:outline-none h-full w-full pl-3 pr-10 text-sm caret-black/60 text-black/80' placeholder='Search by name' />
                    <Search className='text-black/50 absolute right-2' size={20} />
                </div>

                <button className='flex items-center justify-center gap-1 text-white bg-light-blue/95 hover:bg-light-blue/90 duration-200 cursor-pointer rounded-full shadow-sm px-3 py-[10px] text-sm font-medium'>
                    <Plus size={16} color='white' />
                    <span>
                        Create Book
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Header;