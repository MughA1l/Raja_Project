import React, { useState } from "react";

const OCR = ({ ocr }) => {
  const [copied, setCopied] = useState(ocr);

  if (!copied) return;
  return (
    <div className="w-full h-[550px] overflow-y-auto">
      <div dangerouslySetInnerHTML={{ __html: copied }} />
    </div>
  );
};

export default OCR;
