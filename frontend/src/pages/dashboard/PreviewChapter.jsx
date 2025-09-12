import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SingleImageContainer from "../../components/SingleChapter/ImageContainer";
import TextContainer from "../../components/SingleChapter/TextContainer";
import AllImagesContainer from "../../components/SingleChapter/AllImagesContainer";

const PreviewChapter = () => {
  const location = useLocation();
  const [images, setImages] = useState(location.state?.images || []);
  const [selectedImage, setSelectedImage] = useState(1);

  return (
    <div className="min-h-screen max-h-fit w-full p-5 pt-5 bg-[#F7F7F7] rounded-xl">
      <div className="grid grid-cols-20 gap-3">
        {/* to show both the image container and the text (ocr ++) */}
        <div className="col-span-14 w-full h-full bg-white rounded-xl">
          <SingleImageContainer
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            image={images[selectedImage - 1]}
            totalImages={images?.length}
          />
          {/* ocr,youtube-suggestions container */}
          <TextContainer
            key={selectedImage}
            image={images[selectedImage - 1]}
            selectedImage={selectedImage}
            totalImages={images?.length}
          />
        </div>

        {/* to show all images */}
        <AllImagesContainer
          allImages={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </div>
  );
};

export default PreviewChapter;
