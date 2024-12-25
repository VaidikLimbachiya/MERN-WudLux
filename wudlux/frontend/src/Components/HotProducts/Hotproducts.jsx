import React from 'react';
import './hotProducts.css'; // Single CSS file

// Import your images from the assets folder
import product1 from '../../assets/product1.png';
import product2 from '../../assets/product2.png';
import product3 from '../../assets/product3.png';
import product4 from '../../assets/product4.png';
import product5 from '../../assets/product5.png';
import product6 from '../../assets/product6.png';

const products = [
  { image: product1, title: 'Product 1' },
  { image: product2, title: 'Product 2' },
  { image: product3, title: 'Product 3' },
  { image: product4, title: 'Product 4' },
  { image: product5, title: 'Product 5' },
  { image: product6, title: 'Product 6' },
];

const HotProducts = () => {
  return (
    <div className="hotProductsContainer">
      <header className="hotProductsHeader">
        <h2 className="hotProductsTitle">Hot Products</h2>
        <p className="hotProductsDescription">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
        </p>
      </header>
      <div className="hotProductsGrid">
        {products.map((product, index) => (
          <div className="productCard" key={index}>
            <img
              loading="lazy"
              src={product.image}
              alt={product.title}
              className="productImage"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotProducts;
