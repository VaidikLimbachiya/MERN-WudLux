// import React from "react";
import "./YouTube.css";

const PremiumLook = () => {
  return (
    <div className="premium-look-section">
      <h2 className="premium-look-title">See Our Premium Look</h2>
      <p className="premium-look-subtitle">
        Curate your style and effortlessly craft your perfect Wudlux.
      </p>
      <div className="premium-look-videos">
        <div className="video-container">
          <div className="video-overlay">
            {/* <span className="play-button">▶</span> */}
          </div>
          {/* <video
            src="path-to-video1.mp4"
            className="video"
            controls
            poster="path-to-video-thumbnail1.jpg"
          ></video> */}
          <iframe width="560" height="315" src="https://www.youtube.com/embed/xBuOZSS5kdE?si=jQlypUGmjOGO9OSR&amp;start=00" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div className="video-container">
          <div className="video-overlay">
            {/* <span className="play-button">▶</span> */}
          </div><iframe width="560" height="315" src="https://www.youtube.com/embed/xBuOZSS5kdE?si=jQlypUGmjOGO9OSR&amp;start=00" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

          {/* <video
            src="path-to-video2.mp4"
            className="video"
            controls
            poster="path-to-video-thumbnail2.jpg"
          ></video> */}
        </div>
      </div>
    </div>
  );
};

export default PremiumLook;
