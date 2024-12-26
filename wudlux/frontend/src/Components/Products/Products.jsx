import React from 'react';
import './Products.css';

// Import images from the assets folder
import product1 from '../../assets/product1.png';
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';
import product4 from '../../assets/product4.png';
import product5 from '../../assets/product5.png';
import product6 from '../../assets/product6.png';
import product7 from '../../assets/product7.png';
import product8 from '../../assets/product8.png';
import bagIcon from '../../assets/bag.png'; // Import the bag icon image

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
    image: product5,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 6,
    image: product6,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 7,
    image: product7,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
  {
    id: 8,
    image: product8,
    title: 'Aliquam lobortis est turpis mauris ...',
    price: '₹299.00',
    originalPrice: '₹499.00',
    discount: '-60%',
  },
];

const ProductsSection = () => {
  return (
    <div className="productsSection">
      {/* Header Section */}
      <div className="productsHeader">
        <h2 className="productsTitle">Newly Launched</h2>
        <p className="productsSubtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
        </p>
      </div>

      {/* Product Grid */}
      <div className="productsGrid">
        {products.map((product) => (
          <div className="productCard" key={product.id}>
            <div className="productImageWrapper">
              <img src={product.image} alt={product.title} className="productImage" />
              <div className="discountBadge">{product.discount}</div>
              {/* Add to Bag Button */}
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

      {/* View All Button */}
      <div className="viewAllButtonWrapper">
        <button className="viewAllButton">View All →</button>
      </div>
    </div>
  );
};

export default ProductsSection;
