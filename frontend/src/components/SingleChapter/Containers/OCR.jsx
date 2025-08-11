import React, { useState } from 'react'
import { ocrData } from '../../../placeholder/ActualResult.data'

const OCR = () => {
  const [copied, setCopied] = useState(ocrData[0]["ocr"]);

  if (!copied) return
  return (
    <div className='w-full h-[550px] overflow-y-auto'>
      <div
        dangerouslySetInnerHTML={{ __html: copied }}
      />
    </div>
  )
}

export default OCR;