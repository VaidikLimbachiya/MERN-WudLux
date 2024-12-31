import { useState } from 'react';
import './caroProduct.css';
import product1 from '../../assets/product1.png';
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';
import product4 from '../../assets/product4.png';
import bagIcon from '../../assets/bag.png';

// Sample product data
const products = [
  {
    id: 1,
    image: product1,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 2,
    image: product2,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 3,
    image: product3,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 4,
    image: product4,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 5,
    image: product1,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 6,
    image: product2,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 7,
    image: product3,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 8,
    image: product4,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
];

const Products = () => {
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

  // Ensure products wrap around if there are fewer than 4 remaining at the end
  const visibleProducts =
    currentIndex + 4 <= products.length
      ? products.slice(currentIndex, currentIndex + 4)
      : [...products.slice(currentIndex), ...products.slice(0, (currentIndex + 4) % products.length)];

  return (
    <div className="productsSection">
      {/* Header Section */}
      <div className="productsHeader">
        <h2 className="productsTitle">
          Newly Launched
          <div className="titleUnderline"></div>
        </h2>
        <p className="productsSubtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
        </p>
      </div>

      {/* Product Grid */}
      <div className="productsGrid">
        {visibleProducts.map((product) => (
          <div className="productCard" key={product.id}>
            <div className="productImageWrapper">
              <img src={product.image} alt={product.title} className="productImage" />
              <div className="discountBadge">{product.discount}</div>
              <div className="addToBagWrapper">
                <button className="addToBagButton">
                  Add to Bag <img src={bagIcon} alt="Bag Icon" className="bagIcon" />
                </button>
              </div>
            </div>
            <div className="productDetails">
              <p className="productTitle">{product.title}</p>
              <div className="productPrice">
                <span className="currentPrice">{product.price}</span>
                <span className="originalPrice">{product.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <div className="carousel-controls">
        <button className="carousel-button" onClick={handlePrev}>
          &#8592;
        </button>
        <button className="carousel-button" onClick={handleNext}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Products;
