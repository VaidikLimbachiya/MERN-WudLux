// import React from "react";
import "./HotProducts.css";

// Import images from the assets folder
import largeImage from "../../assets/hp1.png";
import smallImage1 from "../../assets/hp2.png";
import smallImage2 from "../../assets/hp3.png";
import smallImage3 from "../../assets/hp4.png";
import smallImage4 from "../../assets/hp5.png";
import smallImage5 from "../../assets/hp6.png";

const productImages = [
  { src: largeImage, title: "Wooden Bowl", type: "large" },
  { src: smallImage1, title: "Serving Tray", type: "small" },
  { src: smallImage2, title: "Wooden Box", type: "small" },
  { src: smallImage3, title: "Utensils", type: "small" },
  { src: smallImage4, title: "Cutting Board", type: "small" },
  { src: smallImage5, title: "Serving Plate", type: "small" },
];

const HotProducts = () => {
  return (
    <section className="hot-products-section">
      <header className="hot-products-header">
        <h1 className="hot-products-title">Hot Products</h1>
        <p className="hot-products-description">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
        </p>
      </header>
      <div className="hot-products-grid">
        {productImages.map((image, index) => (
          <div
            key={index}
            className={`hot-product ${image.type === "large" ? "large" : "small"}`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="hot-product-image"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotProducts;
