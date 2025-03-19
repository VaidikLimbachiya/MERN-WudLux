import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Use useParams instead of match
import "./ProductInfo.css";
import zoom from "../../assets/zoom.png";
import prev from "../../assets/prev.png";
import next from "../../assets/next.png";
import bag from "../../assets/wbag.png";
import arr from "../../assets/arr.png";
import offer from "../../assets/offer.png";
import check from "../../assets/Check.png";
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
import { useCartContext } from "../../Context/CartContext";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams(); // Use useParams hook to get the product ID from the URL

  const [product, setProduct] = useState(null); // Store product details
  const [currentImage, setCurrentImage] = useState(0); // Current image index
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [mainImage, setMainImage] = useState(""); // Current main image
  const { cartItems, updateQuantity, addToCart } = useCartContext();
  const cartItem = product
    ? cartItems.find((item) => item.productId === product._id)
    : null;
  const quantity = cartItem ? cartItem.quantity : 1;

  const handleShare = () => {
    if (navigator.share) {
      // Web Share API for mobile & modern browsers
      navigator
        .share({
          title: `${product.title}`,
          text: `Check out this product: ${product.title}`,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for older browsers - Copy link to clipboard
      navigator.clipboard
        .writeText("url")
        .then(() => alert("Link copied to clipboard! Share it anywhere."))
        .catch((err) => console.error("Error copying link:", err));
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isModalOpen]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://mern-wudlux-1-lss8.onrender.com/api/products/list/${id}`
        );
        const fetchedProduct = response.data.product;
        setProduct(fetchedProduct); // Set product data to state
        if (fetchedProduct && fetchedProduct.variantImages.length > 0) {
          setMainImage(fetchedProduct.variantImages[0].url);
        }        
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]); // Trigger when the ID changes

  // Handle Previous Image
  const handlePrev = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? product.variantImages.length - 1 : prevIndex - 1
    );
    setMainImage(
        product.variantImages[
          currentImage === 0
            ? product.variantImages.length - 1
            : currentImage - 1
        ].url
    );
  };

  // Handle Next Image
  const handleNext = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === product.variantImages.length - 1 ? 0 : prevIndex + 1
    );
    setMainImage(
        product.variantImages[
          currentImage === product.variantImages.length - 1
            ? 0
            : currentImage + 1
        ].url
    );
  };

  // Handle Thumbnail Click
  const handleThumbnailClick = (index) => {
    setCurrentImage(index); // Update the currentImage state with the clicked thumbnail index
product.variantImages[index].url
  };

  // If product is not loaded yet, show a loading state
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-containerr">
      <div className="product-containerr">
        <div className="breadcrumb-nav">
          {/* Home Link */}
          <a href="/" className="breadcrumb-nav-link">
            <img src={home} alt="Home" className="breadcrumb-nav-icon" />
          </a>


          {/* Category and Subcategory Links */}
          {product.categories &&
            product.categories.map((category, index) => (
              <span key={index}>
                <a
                  href={`/${category.slug}`} // Dynamic slug-based URL
                  className="breadcrumb-nav-link"
                >
                  {category.name}
                </a>
                {/* Add separator except for the last item */}
                {index < product.categories.length - 1 && (
                  <div>
                    <span className="breadcrumb-nav-separator">&gt;</span>
                    <span className="breadcrumb-nav-current">
                      {product.category}
                    </span>
                  </div>
                )}
              </span>
            ))}

          {/* Current Product Title */}
          <span className="breadcrumb-nav-separator">&gt;</span>
          <span className="breadcrumb-nav-current">{product.title}</span>
        </div>
      </div>
      <div className="product-gridd">
        {/* Image Section */}
        <div className="product-image-section">
          <div className="main-image-wrapper">
            <button className="nav-button prev" onClick={handlePrev}>
              <img src={prev} alt="Previous" loading="lazy"/>
            </button>
            <img
              crossOrigin="anonymous"
              src={mainImage} // Main image updates with state
              alt="Product"
              className="main-image"
              loading="lazy"
            />
            <button
              className="zoom-button"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={zoom} alt="Zoom" loading="lazy"/>
            </button>
            <button className="nav-button next" onClick={handleNext}>
              <img src={next} alt="Next" loading="lazy"/>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="thumbnail-container">
            {product.variantImages.map((img, idx) => (
              <img
                crossOrigin="anonymous"
                key={idx}
                src={img.url} // Thumbnail image URL
                alt={`Thumbnail ${idx + 1}`}
                className={`thumbnail-image ${
                  idx === currentImage ? "active-thumbnail" : ""
                }`}
                onClick={() => handleThumbnailClick(idx)} // On click, set the current image
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        {/* Rest of the component remains the same */}
        <div className="product-container">
          {/* Product Title and Price Section */}
          <div className="product-header">
            <h1 className="product-title1">WUDLUX choice</h1>
            <h2 className="product-name">{product.title}</h2>
            <div className="price-section">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
              <span className="discount">-{product.discount}%</span>
            </div>
          </div>

          {/* Quantity and Buttons Section */}
          <div className="action-section">
            <div className="quantity-container">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(product._id, -1)}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(product._id, 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Bag Button */}
            <button
              className="add-to-bag-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart({ ...product, quantity: 1 });
              }}
            >
               Add to Bag<img src={bag} alt="Bag" loading="lazy"/>
            </button>

            {/* Buy Now Button */}
            <button className="buy-now-btn">
              Buy Now <img src={arr} alt="Arrow" loading="lazy"/>
            </button>
          </div>

          {/* Product Specifications */}
          <div className="product-specifications">
            <h3 className="specifications-title">Product Specifications</h3>
            <div className="specs">
              <div className="spec-row side-by-side">
              <div className="spec-container">
  <div className="spec-item">
    <span className="spec-label">Category:</span>
    <span className="spec-value">{product.category}</span>
  </div>
  <div className="spec-item">
    <span className="spec-label">Material:</span>
    <span className="spec-value">{product.materials.join(", ")}</span>
  </div>
</div>

              </div>

              {/* Sizes */}
              <div className="spec-row">
                <span className="spec-label">Size:</span>
                <div className="size-options">
                  {product.size.map((size, index) => (
                    <div key={index} className="size-box">
                      L-{size.L} B-{size.B} H-{size.H}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="special-offer">
            <div className="offer-header">
              <img src={offer} alt="Offer Icon" className="offer-icon" loading="lazy"/>
              <h3 className="offer-title">Special Offer</h3>
            </div>
            <ul className="offer-list">
              <li>
                <img src={check} alt="Checkmark" className="checkmark-icon" loading="lazy"/>
                Limited Time Offer! (Buy 3 & Get 1 free)
              </li>
              <li>
                <img src={check} alt="Checkmark" className="checkmark-icon" loading="lazy"/>
                Free delivery available*
              </li>
              <li>
                <img src={check} alt="Checkmark" className="checkmark-icon" loading="lazy"/>
                FESTIVE OFFER - Sale 30% Off Use Code: Deal30
              </li>
            </ul>
          </div>

          {/* Policy Section */}
          <div className="policy-section-container">
            <h3 className="policy-title">WUDLUX Policy</h3>
            <div className="policy-section">
              <div className="policy">
                <img
                  src={delivery}
                  alt="Assured Delivery"
                  className="policy-icon"
                  loading="lazy"
                />
                <span className="policy-text">Assured Delivery</span>
              </div>
              <div className="policy">
                <img
                  src={cancellation}
                  alt="Easy Cancellation"
                  className="policy-icon"
                  loading="lazy"
                />
                <span className="policy-text">Easy Cancellation</span>
              </div>
              <div className="policy">
                <img
                  src={warranty}
                  alt="1 Year Warranty"
                  className="policy-icon"
                  loading="lazy"
                />
                <span className="policy-text">1 Year Warranty</span>
              </div>
              <div className="policy">
                <img
                  src={replacement}
                  alt="7 Days Replacement"
                  className="policy-icon"
                  loading="lazy"
                />
                <span className="policy-text">7 Days Replacement</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="additional-info">
            <h3 className="additional-title">Additional Information</h3>
            <p className="additional-text">{product.description}</p>
          </div>

          {/* Social Media Icons */}
          <div className="social-links">
            <div
              className="share-icon"
              onClick={handleShare}
              style={{ cursor: "pointer" }}
            >
              <img src={share} alt="Share" className="icon" loading="lazy"/>
            </div>
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

      {isModalOpen && product.variantImages && (
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
                crossOrigin="anonymous"
                id="zoomed-image"
                src={product.variantImages[currentImage].url}
                alt="Zoomed product view"
                className="full-image"
                loading="lazy"
              />
            </div>

            {/* Thumbnail Carousel */}
            <div className="carousel-container">
              {/* Previous Button */}
              <button
                className="carousel-nav prev"
                aria-label="View previous image"
                onClick={handlePrev}
              >
                <img src={prev} alt="Previous" className="carousel-nav-icon" loading="lazy"/>
              </button>

              {/* Thumbnails */}
              <div className="carousel-thumbnails">
                {product.variantImages.map((img, idx) => (
                  <img
                    crossOrigin="anonymous"
                    key={idx}
                    src={img.url} // Fallback for missing thumbnails
                    alt={`Thumbnail ${idx + 1}`}
                    className={`thumbnail-image ${
                      idx === currentImage ? "active-thumbnail" : ""
                    }`}
                    onClick={() => setCurrentImage(idx)} // Update current image on thumbnail click
                    loading="lazy"
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                className="carousel-nav next"
                aria-label="View next image"
                onClick={handleNext}
              >
                <img src={next} alt="Next" className="carousel-nav-icon" loading="lazy"/>
              </button>
            </div>
          </div>
        </div>
      )}
      <>
        <Products />
        <Services />
      </>
    </div>
  );
};

export default ProductPage;
