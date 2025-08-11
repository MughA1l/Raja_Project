import React, { useState } from 'react'
import { ocrData } from '../../../placeholder/ActualResult.data'

const ENHANCED = () => {
    const [copied, setCopied] = useState(ocrData[0]["enhancedText"]);
  return (
    <div className='w-full h-[550px] overflow-y-auto'>
      <div
        dangerouslySetInnerHTML={{ __html: copied }}
      />
    </div>
  )
}

export default ENHANCED;