import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Share2 } from "lucide-react";
import SingleImageContainer from "@singleChapter/ImageContainer";
import TextContainer from "@singleChapter/TextContainer";
import AllImagesContainer from "@singleChapter/AllImagesContainer";
import ChapterSkeleton from "@singleChapter/ChapterSkeleton";
import ShareModal from "@singleChapter/ShareModal";
import { getSingleChapter } from "@services/chapterService";
import { showError } from "@utils/toast";

const PreviewChapter = () => {
  const { chapterId } = useParams();
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [chapterData, setChapterData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const fetchChapterData = async () => {
    if (!chapterId) return;

    setLoading(true);
    try {
      const response = await getSingleChapter(chapterId);
      if (response.success) {
        setChapterData(response.data.chapter);
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
    <div className="min-h-screen max-h-fit w-full p-3 md:p-5 pt-3 md:pt-5 bg-[#F7F7F7] rounded-xl">
      {/* Chapter Header with Share Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg md:text-xl font-bold text-dark-blue line-clamp-1">
            {chapterData?.name || "Chapter Preview"}
          </h1>
          <p className="text-xs md:text-sm text-black/50">
            {images.length} {images.length === 1 ? "image" : "images"}
          </p>
        </div>
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-light-blue text-white rounded-xl hover:bg-light-blue/90 transition-colors font-medium text-sm md:text-base w-full sm:w-auto justify-center"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-20 gap-3">
        {/* to show both the image container and the text (ocr ++) */}
        <div className="lg:col-span-14 w-full h-full bg-white rounded-xl order-2 lg:order-1">
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
        <div className="lg:col-span-6 order-1 lg:order-2">
          <AllImagesContainer
            allImages={images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        chapterId={chapterId}
        chapterName={chapterData?.name}
      />
    </div>
  );
};

export default PreviewChapter;
