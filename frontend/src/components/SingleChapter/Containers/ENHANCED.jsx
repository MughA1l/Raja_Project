import React, { useState } from "react";

const ENHANCED = ({ enhancedText }) => {
  const [copied, setCopied] = useState(enhancedText);
  return (
    <div className="w-full h-[550px] overflow-y-auto">
      <div dangerouslySetInnerHTML={{ __html: copied }} />
    </div>
  );
};

export default ENHANCED;
