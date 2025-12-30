import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import SingleImageContainer from "@singleChapter/ImageContainer";
import TextContainer from "@singleChapter/TextContainer";
import AllImagesContainer from "@singleChapter/AllImagesContainer";
import ChapterSkeleton from "@singleChapter/ChapterSkeleton";
import { getSingleChapter } from "@services/chapterService";
import { showError } from "@utils/toast";

const PreviewChapter = () => {
  const { chapterId } = useParams();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchChapterData = async () => {
    if (!chapterId) return;

    setLoading(true);
    try {
      const response = await getSingleChapter(chapterId);
      if (response.success) {
        setImages(response.data.chapter.images || []);
      } else {
        showError("Failed to load chapter images");
      }
    } catch (error) {
      console.error("Error fetching chapter:", error);
      showError("Failed to load chapter images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, [chapterId]);

  if (loading) {
    return <ChapterSkeleton />;
  }

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
            setImages={setImages}
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
