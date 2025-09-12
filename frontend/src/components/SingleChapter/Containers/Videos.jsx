import { Play } from "lucide-react";
import React, { useState } from "react";

const Videos = ({ videosArr }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const extractVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handlePlay = (video) => {
    setCurrentVideo(video.url === currentVideo?.url ? null : video);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getThumbnail = (videoId) => {
    // Always try maxres first
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  return (
    <div className="h-[550px] overflow-y-auto p-6 space-y-6">
      {videosArr.map((video, index) => {
        const videoId = extractVideoId(video.url);
        const embedUrl = videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : null;

        return (
          <div
            key={index}
            className="bg-white p-2 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              {embedUrl ? (
                currentVideo?.url === video.url ? (
                  <>
                    <iframe
                      src={`${embedUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    ></iframe>
                  </>
                ) : (
                  <>
                    <img
                      src={getThumbnail(videoId)}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) =>
                        (e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
                      }
                    />
                    {/* Play button overlay */}
                    <button
                      onClick={() => handlePlay(video)}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="backdrop-blur-md bg-white/40 rounded-full p-5 shadow-lg">
                        <Play className="w-10 h-10 text-white drop-shadow-md" />
                      </div>
                    </button>
                  </>
                )
              ) : (
                <div className="p-4 bg-gray-100 text-center text-gray-500">
                  Invalid video URL
                </div>
              )}
            </div>

            {/* Title */}
            <div className="p-3">
              <h3 className="font-medium text-gray-800">
                {video.title}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Videos;
