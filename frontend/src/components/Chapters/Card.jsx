import React, { useState } from 'react'
import { FileText, Heart, ImageDown, ScanText } from 'lucide-react';

const Card = ({ chapter }) => {
    const [isFav, setIsFav] = useState(chapter?.isFavourite);

    if (!chapter) return null;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    return (
        <div className='col-span-1 h-80 mb-14 p-2 pb-3 bg-white shadow-md shadow-black/5 rounded-2xl relative cursor-pointer'>

            {/* div to show the image */}
            <div className='absolute left-1/2 -translate-x-1/2 -top-9 inset-x-0 h-40 w-11/12 rounded-2xl overflow-hidden shadow-md'>
                <img src={chapter?.image} className='h-full w-full object-cover' alt="chapter-image" />
                {/* to show complete/ incomplete */}
                <div className='absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-dark-blue text-[12px] font-medium text-white'>
                    {chapter?.isMids ? 'mids' : 'finals'}
                </div>

                <span className='absolute top-2 right-3'>
                    <Heart
                        className={`text-light-pink/80 duration-200 ${isFav ? 'fill-light-pink' : ' hover:fill-light-pink/30'}`}
                        size={26}
                        onClick={() => setIsFav(!isFav)}
                    />
                </span>
            </div>

            {/* to show the content of the chapter card */}
            <div className='pt-32 px-1 h-full w-full flex flex-col justify-between'>
                {/* to show the creation date */}
                <div>
                    <div className='text-[11px] text-black/40 font-medium'>
                        {formatDate(chapter?.createdAt)}
                    </div>
                    {/* show the title */}
                    <div className='font-semibold pt-1 line-clamp-2 w-full break-all'>
                        {chapter?.Name}
                    </div>
                </div>

                {/* to show the counts */}
                <div>
                    <div className='flex items-center justify-between px-2'>
                        <span className='text-black/60 flex items-center justify-center gap-1'>
                            <ImageDown size={18} />
                            <span className='text-sm font-medium'>
                                {
                                    chapter?.imageCount
                                }
                            </span>
                        </span>

                        <span className='text-black/60 flex items-center justify-center py-3 gap-1'>
                            <FileText size={18} />
                            <span className='text-sm font-medium'>
                                {
                                    chapter?.ocrCount
                                }
                            </span>
                        </span>

                        <span className='text-black/60 flex items-center justify-center py-3 gap-1'>
                            <ScanText size={18} />
                            <span className='text-sm font-medium'>
                                {
                                    chapter?.ocrCount
                                }
                            </span>
                        </span>

                    </div>

                    {/* start and progress */}
                    <div className="flex justify-between items-center pt-2 w-full">
                        <progress className="progress progress-secondary w-56" value="10" max="100"></progress>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Card;