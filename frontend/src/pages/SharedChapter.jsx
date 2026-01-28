import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  BookOpen,
  User,
  Calendar,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { getSharedChapter } from "@services/shareService";
import { formateDate } from "@utils/formateDate";

const SharedChapter = () => {
  const { shareToken } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["OCR", "Enhanced AI Text", "YouTube Videos"];

  const fetchSharedChapter = async () => {
    if (!shareToken) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getSharedChapter(shareToken);
      if (response.success) {
        setChapter(response.data.chapter);
      } else {
        setError("Chapter not found or link has expired");
      }
    } catch (err) {
      console.error("Error fetching shared chapter:", err);
      setError(
        err.response?.data?.message ||
          "This shared link is invalid or has expired"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSharedChapter();
  }, [shareToken]);

  const currentImage = chapter?.images?.[selectedImage];

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev > 0 ? prev - 1 : chapter.images.length - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev < chapter.images.length - 1 ? prev + 1 : 0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-light-blue mx-auto mb-4" />
          <p className="text-dark-blue/70">Loading shared chapter...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-dark-blue mb-2">
            Link Not Found
          </h1>
          <p className="text-black/60 mb-6">{error}</p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-light-blue text-white rounded-xl font-medium hover:bg-light-blue/90 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <div className="bg-white border-b border-black/6 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-light-blue/10 rounded-xl">
              <BookOpen size={24} className="text-light-blue" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-blue line-clamp-1">
                {chapter?.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-black/50">
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {chapter?.userId?.username || "Anonymous"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formateDate(chapter?.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <ImageIcon size={14} />
                  {chapter?.images?.length || 0} images
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 bg-dark-blue text-white rounded-xl font-medium hover:bg-dark-blue/90 transition-colors text-sm"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-5">
        {chapter?.images?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Image Viewer */}
            <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden">
              {/* Image Display */}
              <div className="relative h-[400px] bg-gray-100">
                <img
                  src={currentImage?.url}
                  alt={currentImage?.name}
                  className="w-full h-full object-contain"
                />

                {/* Navigation */}
                {chapter.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                  {selectedImage + 1} / {chapter.images.length}
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t border-black/6">
                <div className="flex border-b border-black/6">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(index)}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === index
                          ? "text-light-blue border-b-2 border-light-blue"
                          : "text-black/50 hover:text-black/70"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-4 max-h-[300px] overflow-y-auto">
                  {activeTab === 0 && (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: currentImage?.ocr || "<p>No OCR content available</p>",
                      }}
                    />
                  )}
                  {activeTab === 1 && (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          currentImage?.enhancedText ||
                          "<p>No enhanced content available</p>",
                      }}
                    />
                  )}
                  {activeTab === 2 && (
                    <div className="space-y-3">
                      {currentImage?.videos?.length > 0 ? (
                        currentImage.videos.map((video, idx) => (
                          <a
                            key={idx}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-24 h-16 object-cover rounded-lg"
                            />
                            <span className="text-sm font-medium text-dark-blue line-clamp-2">
                              {video.title}
                            </span>
                          </a>
                        ))
                      ) : (
                        <p className="text-black/50 text-center py-4">
                          No videos available
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnails Sidebar */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-semibold text-dark-blue mb-3">All Images</h3>
              <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
                {chapter.images.map((image, index) => (
                  <div
                    key={image._id}
                    onClick={() => setSelectedImage(index)}
                    className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-light-blue"
                        : "border-transparent hover:border-black/10"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-20 object-cover"
                    />
                    <div className="p-2 bg-gray-50">
                      <p className="text-xs text-dark-blue/70 line-clamp-1">
                        {image.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center">
            <ImageIcon size={48} className="text-black/20 mx-auto mb-3" />
            <p className="text-black/60">No images in this chapter</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-black/6 px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-black/50">
          Shared via{" "}
          <span className="font-semibold text-light-blue">AI Study Sync</span>
        </div>
      </div>
    </div>
  );
};

export default SharedChapter;
