import { useState, useEffect } from "react";
import "./caroProduct.css"; // Ensure CSS styles are properly linked
import bagIcon from "../../assets/bag.png"; // Static icon
import product1 from "../../assets/product1.png"; // Static product image
const ProductCarousel = () => {
  const [products, setProducts] = useState([]); // To hold product data
  const [currentIndex, setCurrentIndex] = useState(0); // Current carousel position

  // Fetch products dynamically from backend
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        return;
      }
      
      const result = await response.json();
  
      if (result.success && Array.isArray(result.data)) {
        console.log('Products fetched:', result.data);
        setProducts(result.data); // Set the fetched products to state
      } else {
        console.error('Unexpected API response format:', result);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  
  // Navigate to the next set of products
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= products.length ? 0 : prevIndex + 4
    );
  };

  // Navigate to the previous set of products
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 4 < 0 ? products.length - 4 : prevIndex - 4
    );
  };

  // Calculate the visible products
  const visibleProducts = Array.isArray(products) ? products.slice(currentIndex, currentIndex + 4) : [];


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
        {visibleProducts.slice(0, 4).map((product, index) => (
          <div className="shop-carousel-card" key={product.id || index}>
            <div className="shop-carousel-image-wrapper">
              <img
                crossOrigin="anonymous"
                src={`http://localhost:5000/uploads/${
                  product.image ? product.image : product1
                }`}
                alt={product.title}
                className="shop-carousel-image"
              />
              <div className="shop-carousel-discount-badge">
                {product.discount}
              </div>
              <div className="shop-carousel-add-to-bag-wrapper">
                <button className="shop-carousel-add-to-bag-button">
                  Add to Bag
                  <img
                    src={bagIcon}
                    alt="Bag Icon"
                    className="shop-carousel-bag-icon"
                  />
                </button>
              </div>
            </div>
            <div className="shop-carousel-details">
              <p className="shop-carousel-product-title">{product.title}</p>
              <div className="shop-carousel-product-price">
                <span className="shop-carousel-current-price">
                  {product.price}
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
      {products.length > 4 && (
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
