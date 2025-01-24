import  { useState } from "react";
import "./ProductInfo.css";
import mainImage from "../../assets/main.png";
import thumbnail1 from "../../assets/main.png";
import thumbnail2 from "../../assets/main2.png";
import thumbnail3 from "../../assets/main3.png";
import thumbnail4 from "../../assets/main4.png";
import zoom from "../../assets/zoom.png";
import prev from "../../assets/prev.png";
import next from "../../assets/next.png";
import bag from "../../assets/wbag.png";
import arr from "../../assets/arr.png";
import offer from "../../assets/offer.png";
import check from "../../assets/check.png";
import delivery from "../../assets/delivery.png";
import cancellation from "../../assets/cancle.png";
import warranty from "../../assets/warranty.png";
import replacement from "../../assets/replace.png";
import share from "../../assets/share.png";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import Services from "../../Components/Services/service";
import Products from "../../Components/Products/Products";
import home from "../../assets/home.png";

const images = [mainImage, thumbnail1, thumbnail2, thumbnail3, thumbnail4];

const ProductPage = () => {
  const [currentImage, setCurrentImage] = useState(0); // Current image index
  const [quantity, setQuantity] = useState(1); // Quantity selector
  const [isModalOpen, setIsModalOpen] = useState(0); // Modal visibility

  const handleQuantityChange = (type) => {
    if (type === "increment") setQuantity(quantity + 1);
    else if (type === "decrement" && quantity > 1) setQuantity(quantity - 1);
  };

  const handlePrev = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0: prevIndex + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <div className="product-containerr">
      <div className="breadcrumb-nav">
        <a href="/" className="breadcrumb-nav-link">
          <img src={home} alt="Home" className="breadcrumb-nav-icon" />
        </a>
        <span className="breadcrumb-nav-separator">&gt;</span>
        <a href="/kitchenware" className="breadcrumb-nav-link">
          Kitchenware
        </a>
        <span className="breadcrumb-nav-separator">&gt;</span>
        <a href="/bowl" className="breadcrumb-nav-link">
          Bowl
        </a>
        <span className="breadcrumb-nav-separator">&gt;</span>
        <span className="breadcrumb-nav-current">Wooden Bowl</span>
      </div>

      <div className="product-gridd">
        {/* Image Section */}
        <div className="product-image-section">
          <div className="main-image-wrapper">
            <button className="nav-button prev" onClick={handlePrev}>
              <img src={prev} alt="Previous" />
            </button>
            <img
              src={images[currentImage]}
              alt="Product"
              className="main-image"
            />
            <button
              className="zoom-button"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={zoom} // Replace with your zoom icon
                alt="Zoom"
              />
            </button>
            <button className="nav-button next" onClick={handleNext}>
              <img src={next} alt="Next" />
            </button>
          </div>
          <div className="thumbnail-container">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className={`thumbnail-image ${
                  idx === currentImage ? "active-thumbnail" : ""
                }`}
                onClick={() => handleThumbnailClick(idx)}
              />
            ))}
          </div>
        </div>

        <div className="product-container">
          {/* Product Title and Price Section */}
          <div className="product-header">
            <h1 className="product-title">WUDLUX Choice</h1>
            <h2 className="product-name">Wooden Bowl</h2>
            <div className="price-section">
              <span className="current-price">₹299.00</span>
              <span className="original-price">₹499.00</span>
              <span className="discount">-60%</span>
            </div>
          </div>

          {/* Quantity and Buttons Section */}
          <div className="action-section">
            <div className="quantity-container">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange("decrement")}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange("increment")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Bag Button */}
            <button className="add-to-bag-btn">
              <img src={bag} alt="Bag" /> Add to Bag
            </button>

            {/* Buy Now Button */}
            <button className="buy-now-btn">
              Buy Now <img src={arr} alt="Arrow" />
            </button>
          </div>

          {/* Product Specifications */}
          <div className="product-specifications">
            <h3 className="specifications-title">Product Specifications</h3>
            <div className="specs">
              {/* Category and Material Side by Side */}
              <div className="spec-row side-by-side">
                <div className="spec-item">
                  <span className="spec-label">Category:</span>
                  <span className="spec-value">Serveware</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Material:</span>
                  <span className="spec-value">Acacia Wood</span>
                </div>
              </div>

              {/* Sizes */}
              <div className="spec-row">
                <span className="spec-label">Sizes:</span>
                <div className="size-options">
                  <div className="size-box">L-12 B-12 H-1</div>
                  <div className="size-box">L-10 B-10 H-1</div>
                  <div className="size-box">L-8 B-8 H-1</div>
                </div>
              </div>
            </div>
          </div>

          <div className="special-offer">
            <div className="offer-header">
              <img src={offer} alt="Offer Icon" className="offer-icon" />
              <h3 className="offer-title">Special Offer</h3>
            </div>
            <ul className="offer-list">
              <li>
                <img src={check} alt="Checkmark" className="checkmark-icon" />
                Limited Time Offer! (Buy 3 & Get 1 free)
              </li>
              <li>
                <img src={check} alt="Checkmark" className="checkmark-icon" />
                Free delivery available*
              </li>
              <li>
                <img src={check} alt="Checkmark" className="checkmark-icon" />
                FESTIVE OFFER - Sale 30% Off Use Code: Deal30
              </li>
            </ul>
          </div>

          <div className="policy-section-container">
            <h3 className="policy-title">WUDLUX Policy</h3>
            <div className="policy-section">
              <div className="policy">
                <img
                  src={delivery}
                  alt="Assured Delivery"
                  className="policy-icon"
                />
                <span className="policy-text">Assured Delivery</span>
              </div>
              <div className="policy">
                <img
                  src={cancellation}
                  alt="Easy Cancellation"
                  className="policy-icon"
                />
                <span className="policy-text">Easy Cancellation</span>
              </div>
              <div className="policy">
                <img
                  src={warranty}
                  alt="1 Year Warranty"
                  className="policy-icon"
                />
                <span className="policy-text">1 Year Warranty</span>
              </div>
              <div className="policy">
                <img
                  src={replacement}
                  alt="7 Days Replacement"
                  className="policy-icon"
                />
                <span className="policy-text">7 Days Replacement</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="additional-info">
            <h3 className="additional-title">Additional Information</h3>
            <p className="additional-text">
              Perfect for serving salads, fruits, snacks, and desserts. <br />{" "}
              Add a rustic, elegant touch to your dining table or gatherings.{" "}
              <br /> A thoughtful gift option for housewarmings, weddings, or
              festive occasions.
            </p>
          </div>
          <div className="social-links">
            {/* Share Icon */}
            <div className="share-icon">
              <img src={share} alt="Share" className="icon" />
            </div>
            {/* Social Media Icons */}
            <div className="social-icons">
              <a href="#facebook" className="social-icon">
                <FaFacebook />
              </a>
              <a href="#instagram" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="zoomed-image"
        >
          <div className="modal-content">
            {/* Close Button */}
            <button
              className="close-modal"
              aria-label="Close zoomed image"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            {/* Zoomed Image Section */}
            <div className="zoomed-image-container">
              <img
                id="zoomed-image"
                src={images[currentImage]}
                alt="Zoomed product view"
                className="full-image"
              />
            </div>

            {/* Thumbnail Carousel */}
            <div className="carousel-container">
              <button className="carousel-nav prev" onClick={handlePrev}>
                <img src={prev} alt="Previous" className="carousel-nav-icon" />
              </button>
              <div className="carousel-thumbnails">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`thumbnail-image ${
                      idx === currentImage ? "active-thumbnail" : ""
                    }`}
                    onClick={() => setCurrentImage(idx)}
                  />
                ))}
              </div>
              <button className="carousel-nav next" onClick={handleNext}>
                <img src={next} alt="Next" className="carousel-nav-icon" />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="products-info">

      <Products />
      </div>
      <Services />
    </div>
  );
  
};

export default ProductPage;
