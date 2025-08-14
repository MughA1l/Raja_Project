import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import Header from './Header';
import Videos from './Containers/Videos';
import ENHANCED from './Containers/ENHANCED';
import OCR from './Containers/OCR';

const TextContainer = ({ image, selectedImage, totalImages }) => {

    const [selected, setSelected] = useState(0);

    return (
        <div className='min-h-80 rounded-xl p-2 relative'>
            {/* number to show the images count */}
            {/* <div className='flex items-center justify-center gap-1 bg-black/5 w-fit mx-auto text-sm p-1 px-3 rounded-md font-medium  absolute left-1/2 -translate-x-1/2'>
                <span>
                    {selectedImage}
                </span>
                /
                <span>
                    {totalImages}
                </span>
            </div> */}

            {/* header */}
            <div className='w-full flex items-center px-3 justify-between pt-4'>
                <div className="w-9/12 font-semibold text-lg line-clamp-1">
                    {image?.name}
                </div>
                <button className="w-2/12 py-[9px] flex items-center justify-center gap-1 rounded-lg text-sm font-medium text-white bg-light-pink/90 hover:bg-light-pink duration-100 cursor-pointer">
                    <Plus size={18} color='white' />
                    <span>
                        Add Image
                    </span>
                </button>
            </div>

            {/* main container to show the text and different components */}
            <Header selected={selected} setSelected={setSelected} />

            {/* divs to show the containers based on the selection */}
            <div className='p-4 pt-8'>
                {
                    selected == 0 ? <OCR ocr={image['ocr']}/> : selected == 1 ? <ENHANCED enhancedText={image['enhancedText']}/> : <Videos videosArr={image['videos']}/>
                }
            </div>

        </div>
    )
}

export default TextContainer;