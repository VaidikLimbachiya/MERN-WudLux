import { useState, useEffect } from "react";
import "./caroProduct.css"; // Ensure CSS styles are properly linked
import bagIcon from "../../assets/bag.png"; // Static icon
import product1 from "../../assets/product1.png"; // Static product image

const ProductCarousel = () => {
  const [products, setProducts] = useState([]); // To hold product data
  const [currentIndex, setCurrentIndex] = useState(0); // Current carousel position
  const [productsToShow, setProductsToShow] = useState(4); // Products to display based on screen size

  // Fetch products dynamically from backend
  async function fetchProducts() {
    try {
      const response = await fetch("https://mern-wudlux-1-lss8.onrender.com/api/products/list");

      if (!response.ok) {
        console.error("HTTP error:", response.status, response.statusText);
        return;
      }

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        console.log("Products fetched:", result.data);
        setProducts(result.data);
      } else {
        console.error("Unexpected API response format:", result);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  // Update the number of products displayed based on screen size
  const updateProductsToShow = () => {
    if (window.innerWidth <= 480) {
      setProductsToShow(1); // Show 1 product on small screens
    } else if (window.innerWidth <= 768) {
      setProductsToShow(2); // Show 2 products on tablets
    } else if (window.innerWidth <= 1024) {
      setProductsToShow(3); // Show 3 products on medium screens
    } else {
      setProductsToShow(4); // Show 4 products on large screens
    }
  };

  useEffect(() => {
    fetchProducts();
    updateProductsToShow();
    window.addEventListener("resize", updateProductsToShow);

    return () => {
      window.removeEventListener("resize", updateProductsToShow);
    };
  }, []);

  // Navigate to the next set of products
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + productsToShow >= products.length
        ? 0
        : prevIndex + productsToShow
    );
  };

  // Navigate to the previous set of products
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - productsToShow < 0
        ? products.length - productsToShow
        : prevIndex - productsToShow
    );
  };

  // Calculate the visible products
  const visibleProducts = Array.isArray(products)
    ? products.slice(currentIndex, currentIndex + productsToShow)
    : [];

  return (
    <div className="shop-carousel-container">
      {/* Header Section */}
      <div className="shop-carousel-header">
        <h2 className="shop-carousel-title">
          Newly Launched
          <div className="shop-carousel-title-underline"></div>
        </h2>
        <p className="shop-carousel-subtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero
          est.
        </p>
      </div>

      {/* Product Grid */}
      <div className="shop-carousel-grid">
        {visibleProducts.map((product, index) => (
          <div className="shop-carousel-card" key={product.id || index}>
            <div className="shop-carousel-image-wrapper">
            <img
  crossOrigin="anonymous"
  loading="lazy"
  src={
    product.images?.[0]?.url
      ? product.images[0].url
      : product1 // fallback static product image
  }
  alt={product.title}
  className="shop-carousel-image"
/>

              <div className="shop-carousel-discount-badge">
                {product.discount}%
              </div>
              <div className="shop-carousel-add-to-bag-wrapper">
                <button className="shop-carousel-add-to-bag-button">
                  Add to Bag
                  <img
                    src={bagIcon}
                    alt="Bag Icon"
                    className="shop-carousel-bag-icon"
                    loading="lazy"
                  />
                </button>
              </div>
            </div>
            <div className="shop-carousel-details">
              <p className="shop-carousel-product-title">{product.title}</p>
              <p className="shop-carousel-product-title">
                {product.description}
              </p>
              <div className="shop-carousel-product-price">
                <span className="shop-carousel-current-price">
                  ₹{product.price}
                </span>
                <span className="shop-carousel-original-price">
                  {product.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      {products.length > productsToShow && (
        <div className="shop-carousel-controls">
          <button className="shop-carousel-button" onClick={handlePrev}>
            &#8592;
          </button>
          <button className="shop-carousel-button" onClick={handleNext}>
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
