// import React from 'react';
import './Products.css';
import product1 from '../../assets/product1.png'; // Replace with your actual image paths
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';
import product4 from '../../assets/product4.png';
import product5 from '../../assets/product5.png';
import product6 from '../../assets/product6.png';
import product7 from '../../assets/product7.png';
import product8 from '../../assets/product8.png';

const Products = () => {
  const products = [
    { image: product1, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
    { image: product2, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
    { image: product3, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
    { image: product4, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
    { image: product5, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
    { image: product6, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
    { image: product7, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
    { image: product8, title: "Aliquam lobortis est turpis mauris ...", price: "₹299.00", originalPrice: "₹499.00", discount: "-60%" },
  ];

  return (
    <div className="products">
      <h2 className="products-title">Newly Launched</h2>
      <p className="products-subtitle">Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.</p>
      <div className="products-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.title} className="product-image" />
            <span className="product-discount">{product.discount}</span>
            <div className="product-info">
              <p className="product-title">{product.title}</p>
              <div className="product-prices">
                <span className="current-price">{product.price}</span>
                <span className="original-price">{product.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button">View All →</button>
    </div>
  );
};

export default Products;
