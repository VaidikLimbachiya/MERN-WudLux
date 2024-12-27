// import React from "react";
import "./HotProducts.css";
import image1 from "../../assets/hp1.png"; // Replace with actual image paths
import image2 from "../../assets/hp2.png";
import image3 from "../../assets/hp3.png";
import image4 from "../../assets/hp4.png";
import image5 from "../../assets/hp5.png";
import image6 from "../../assets/hp6.png";

const GridGallery = () => {
  return (
    <div className="grid-section">
      {/* Section Heading */}
      <div className="section-heading">
        <h2 className="heading-title">Hot Products</h2>
        <div className="heading-underline"></div>
        <p className="heading-subtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid-gallery">
        <div className="grid-item item1">
          <img src={image1} alt="Product 1" />
            <div className="hover-overlay">
              <span className="hover-text">Wooden Bowl</span>
                <a href="/product-1" className="hover-link">Shop Now</a>
            </div>
        </div>
        <div className="grid-item item2">
          <img src={image2} alt="Product 2" />
          <div className="hover-overlay">
            <span className="hover-text">Wooden Tray</span>
            <a href="/product-2" className="hover-link">Shop Now</a>
          </div>
        </div>
        <div className="grid-item item3">
          <img src={image3} alt="Product 3" />
          <div className="hover-overlay">
            <span className="hover-text">Tissue Holder</span>
            <a href="/product-3" className="hover-link">Shop Now</a>
          </div>
        </div>
        <div className="grid-item item4">
          <img src={image4} alt="Product 4" />
          <div className="hover-overlay">
            <span className="hover-text">Chopping Board</span>
            <a href="/product-4" className="hover-link">Shop Now</a>
          </div>
        </div>
        <div className="grid-item item5">
          <img src={image5} alt="Product 5" />
          <div className="hover-overlay">
            <span className="hover-text">Butcher Board</span>
            <a href="/product-5" className="hover-link">Shop Now</a>
          </div>
        </div>
        <div className="grid-item item6">
          <img src={image6} alt="Product 6" />
          <div className="hover-overlay">
            <span className="hover-text">Serving Platter</span>
            <a href="/product-6" className="hover-link">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridGallery;
