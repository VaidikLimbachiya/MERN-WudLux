// import React from "react";
import "./OurStory.css"; // Import styles for this page
import heroImage from "../../assets/ourStory.jpg"; // Path to hero image
import storyImage from "../../assets/ostry.png"; // Path to the image in content section

import Features from "../../Components/Features/Features";

function OurStory() {
  return (
    <>

      <div className="our-story-container">
        {/* Hero Section */}
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
        </div>

        {/* Content Section */}
        <div className="story-section">
          {/* Image */}
          <div className="image-container">
            <img src={storyImage} alt="WUDLUX Story" className="story-image" />
          </div>

          {/* Text Content */}
          <div className="content-container">
            <h1 className="section-title">WUDLUX Story </h1>
            <h2 className="section-subtitlee">
              Exclusive Wooden Kitchenware and Serveware
            </h2>
            <p className="section-description">
              &quot;Welcome to Wudlux, where timeless elegance meets sustainable
              craftsmanship. Our journey began with a simple yet profound idea:
              to bring the beauty and functionality of wooden kitchenware and
              serveware into every home. Inspired by nature’s finest materials
              and the artistry of traditional woodworking, we set out to create
              products that are as durable as they are beautiful.&quot;
            </p>
            <button className="explore-products-button">Explore Products →</button>
          </div>
        </div>

        {/* Features Section */}
        <Features />
      </div>
      
    </>
  );
}

export default OurStory;
