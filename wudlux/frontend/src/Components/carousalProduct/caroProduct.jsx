import { useState } from "react";
import "./caroProduct.css";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import bagIcon from "../../assets/bag.png";

const products = [
  {
    id: 1,
    image: product1,
    title: "Aliquam lobortis est turpis mauris ...",
    price: "₹299.00",
    originalPrice: "₹499.00",
    discount: "-60%",
  },
  {
    id: 2,
    image: product2,
    title: "Aliquam lobortis est turpis mauris ...",
    price: "₹299.00",
    originalPrice: "₹499.00",
    discount: "-60%",
  },
  {
    id: 3,
    image: product3,
    title: "Aliquam lobortis est turpis mauris ...",
    price: "₹299.00",
    originalPrice: "₹499.00",
    discount: "-60%",
  },
  {
    id: 4,
    image: product4,
    title: "Aliquam lobortis est turpis mauris ...",
    price: "₹299.00",
    originalPrice: "₹499.00",
    discount: "-60%",
  },
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= products.length ? 0 : prevIndex + 4
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 4 < 0 ? products.length - 4 : prevIndex - 4
    );
  };

  const visibleProducts =
    currentIndex + 4 <= products.length
      ? products.slice(currentIndex, currentIndex + 4)
      : [
          ...products.slice(currentIndex),
          ...products.slice(0, (currentIndex + 4) % products.length),
        ];

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
        {visibleProducts.map((product) => (
          <div className="shop-carousel-card" key={product.id}>
            <div className="shop-carousel-image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="shop-carousel-image"
              />
              <div className="shop-carousel-discount-badge">{product.discount}</div>
              <div className="shop-carousel-add-to-bag-wrapper">
                <button className="shop-carousel-add-to-bag-button">
                  Add to Bag{" "}
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
                <span className="shop-carousel-current-price">{product.price}</span>
                <span className="shop-carousel-original-price">
                  {product.originalPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="shop-carousel-controls">
        <button className="shop-carousel-button" onClick={handlePrev}>
          &#8592;
        </button>
        <button className="shop-carousel-button" onClick={handleNext}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
