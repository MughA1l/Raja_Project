import { Bell, Plus, Search, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const getPageTitle = (pathname) => {
        switch (pathname) {
            case '/':
                return { top: 'Dashboard', bottom: '' };
            case '/Books':
                return { top: 'Dashboard', bottom: 'Books' };
            case '/Chapters':
                return { top: 'Dashboard', bottom: 'Chapters' };
            case '/Images':
                return { top: 'Dashboard', bottom: 'Images' };
            case '/Settings':
                return { top: 'Dashboard', bottom: 'Settings' };
            default:
                return 'Dashboard';
        }
    };

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

    const pageTitle = getPageTitle(location.pathname);

    return (
        <div className={`w-10/12 h-fit pl-12 pr-8 bg-[#F7F7F7]/50 flex items-center justify-between fixed top-0 right-0 z-40 ${scrolled ? 'backdrop-blur-md bg-white/30 shadow-sm shadow-black/3 border-none' : 'border-b border-b-black/4'}`}>
            <div>
                {
                    pageTitle.bottom ? <h3 className='text-xs flex items-center'>
                        <span className='text-light-pink'>
                            {pageTitle.top}
                            &nbsp;
                        </span>
                        <span className='text-dark-blue'>{" / "}{pageTitle.bottom}</span>
                    </h3> : <h2 className='font-semibold pt-[1px] text-xl text-dark-blue '>
                        {pageTitle.top}
                    </h2>
                }
                <h2 className='font-medium pt-[1px] text-xl text-dark-blue '>
                    {pageTitle.bottom}
                </h2>
            </div>
            <div className='flex items-center gap-4 py-3'>

                <span className='size-9 flex items-center justify-center duration-200 bg-[#384182]  hover:bg-[#444c9b]/97 rounded-full group cursor-pointer'>
                    <Bell className='text-white size-5' />
                </span>

                <span className='size-9 flex items-center justify-center duration-200 bg-[#384182]  hover:bg-[#444c9b]/97 rounded-full group cursor-pointer'>
                    <Settings className='text-white size-5' />
                </span>

                {/* avatar */}
                <div className="flex items-center justify-start gap-3 w-38 cursor-pointer hover:opacity-90 duration-100">
                    <div className="avatar hover:opacity-85 cursor-pointer duration-100">
                        <div className="ring-secondary ring-offset-base-100 size-9 rounded-full ring-2 ring-offset-2">
                            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                        </div>
                    </div>
                    {/* container to show the username,email */}
                    <div className='w-full'>
                        <h4 className='text-sm font-medium line-clamp-1'>
                            Zain298_
                        </h4>
                        <p className='text-xs line-clamp-1 break-all pt-[0.7px]'>
                            Zain@gmail.com
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Header;