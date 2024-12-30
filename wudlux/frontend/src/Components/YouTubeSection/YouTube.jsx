import "react";
import "./YouTube.css";
import thumbnail1 from "../../assets/yt2.jpg"; // Import thumbnails
import thumbnail2 from "../../assets/yt1.jpg";
import playIcon from "../../assets/play-icon.svg"; // Import play icon

const YouTube = () => {
  const videos = [
    {
      id: 1,
      thumbnail: thumbnail1, // Use imported thumbnail
      videoUrl: "https://youtu.be/xBuOZSS5kdE?si=3SHfVWUL8SpXxGeV",
    },
    {
      id: 2,
      thumbnail: thumbnail2, // Use imported thumbnail
      videoUrl: "https://youtu.be/xBuOZSS5kdE?si=3SHfVWUL8SpXxGeV",
    },
  ];

  return (
    <div className="premium-look-section">
      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">
          See Our Premium Look
          <div className="title-underline"></div> {/* Add underline below the title */}
        </h2>
        <p className="section-subtitle">
          Curate your style and effortlessly craft your perfect Wudlux.
        </p>
      </div>

      {/* Video Grid */}
      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-item" key={video.id}>
            <div className="video-wrapper">
              <img
                src={video.thumbnail}
                alt={`Premium Look Video ${video.id}`}
                className="video-thumbnail"
              />
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="play-button"
              >
                <img src={playIcon} alt="Play" className="play-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTube;
