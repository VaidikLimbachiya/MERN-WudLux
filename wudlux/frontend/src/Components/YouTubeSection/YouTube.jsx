import { useState } from "react";
import "./YouTube.css";
import thumbnail1 from "../../assets/yt2.svg";
import thumbnail2 from "../../assets/yt1.svg";
import playIcon from "../../assets/play-icon.svg";

const YouTube = () => {
  const videos = [
    {
      id: 1,
      thumbnail: thumbnail1,
      videoId: "xBuOZSS5kdE",
    },
    {
      id: 2,
      thumbnail: thumbnail2,
      videoId: "xBuOZSS5kdE",
    },
  ];

  const [playingVideoId, setPlayingVideoId] = useState(null);

  const handlePlayClick = (id) => {
    setPlayingVideoId((prev) => (prev === id ? null : id)); // toggle
  };

  return (
    <div className="premium-look-section">
      <div className="section-header">
        <h2 className="section-title1">
          See Our Premium Look
          <div className="title-underline1"></div>
        </h2>
        <p className="section-subtitle">
          curate your style and effortlessly craft your perfect Wudlux.
        </p>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-item" key={video.id}>
            {playingVideoId === video.id ? (
              <div className="video-iframe-container">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
                  title={`YouTube video ${video.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  className="close-iframe-button"
                  onClick={() => setPlayingVideoId(null)}
                  title="Close video"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="video-wrapper">
                <img
                  src={video.thumbnail}
                  alt={`Thumbnail ${video.id}`}
                  className="video-thumbnail"
                  loading="lazy"
                />
                <button
                  className="play-button"
                  onClick={() => handlePlayClick(video.id)}
                >
                  <img src={playIcon} alt="Play" className="play-icon" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTube;
