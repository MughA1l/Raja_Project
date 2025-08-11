import React, { useState } from 'react';

const Videos = ({ videosArr }) => {
  const [videos, setVideos] = useState(videosArr);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const extractVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlay = (video) => {
    setCurrentVideo(video.url === currentVideo?.url ? null : video);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className='h-[550px] overflow-y-auto p-4 space-y-4'>
      {videos.map((video, index) => {
        const videoId = extractVideoId(video.url);
        const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

        return (
          <div key={index} className='border rounded-lg overflow-hidden shadow-sm'>
            <div className='p-3 bg-gray-50'>
              <h3 className='font-medium text-gray-800'>{video.title}</h3>
            </div>
            
            {embedUrl ? (
              <div className='relative'>
                {currentVideo?.url === video.url ? (
                  <div className='relative'>
                    <iframe
                      width="100%"
                      height="315"
                      src={`${embedUrl}?autoplay=1&mute=${isMuted ? 1 : 0}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className='w-full aspect-video'
                    ></iframe>
                    <div className='absolute bottom-2 left-2 flex space-x-2'>
                      <button 
                        onClick={() => handlePlay(video)}
                        className='bg-red-500 text-white px-3 py-1 rounded text-sm'
                      >
                        Stop
                      </button>
                      <button 
                        onClick={toggleMute}
                        className='bg-gray-700 text-white px-3 py-1 rounded text-sm'
                      >
                        {isMuted ? 'Unmute' : 'Mute'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className='relative'>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className='w-28 h-28 object-cover'
                    />
                    <button 
                      onClick={() => handlePlay(video)}
                      className='absolute inset-0 flex items-center justify-center'
                    >
                      <div className='bg-black bg-opacity-50 rounded-full p-4'>
                        <svg className='w-8 h-8 text-white' fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='p-4 bg-gray-100 text-center text-gray-500'>
                Invalid video URL
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Videos;