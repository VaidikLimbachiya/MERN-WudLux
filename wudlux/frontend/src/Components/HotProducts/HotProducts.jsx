import React from 'react';
import './HotProducts.css';

// Import images from the assets folder
import product1 from '../../assets/hp1.png';
import product2 from '../../assets/hp2.png';
import product3 from '../../assets/hp3.png';
import product4 from '../../assets/hp4.png';
import product5 from '../../assets/hp5.png';

const HotProducts = () => {
  return (
    <div className="hotProductsSection">
      {/* Header Section */}
      <div className="hotProductsHeader">
        <h2 className="hotProductsTitle">Hot Products</h2>
        <p className="hotProductsSubtitle">
          Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero est.
        </p>
      </div>

      {/* Product Grid */}
      <div className="hotProductsGrid">
        <div className="gridItem" style={{ gridArea: "1 / 1 / 2 / 3" }}>
          <img src={product1} alt="Product 1" className="productImage" />
          <div className="hoverOverlay">
            <h3 className="hoverTitle">Product 1</h3>
            <button className="hoverButton">Shop Now</button>
          </div>
        </div>
        <div className="gridItem" style={{ gridArea: "1 / 3 / 2 / 4" }}>
          <img src={product2} alt="Product 2" className="productImage" />
          <div className="hoverOverlay">
            <h3 className="hoverTitle">Product 2</h3>
            <button className="hoverButton">Shop Now</button>
          </div>
        </div>
        <div className="gridItem" style={{ gridArea: "2 / 1 / 3 / 2" }}>
          <img src={product3} alt="Product 3" className="productImage" />
          <div className="hoverOverlay">
            <h3 className="hoverTitle">Product 3</h3>
            <button className="hoverButton">Shop Now</button>
          </div>
        </div>
        <div className="gridItem" style={{ gridArea: "2 / 2 / 3 / 3" }}>
          <img src={product4} alt="Product 4" className="productImage" />
          <div className="hoverOverlay">
            <h3 className="hoverTitle">Product 4</h3>
            <button className="hoverButton">Shop Now</button>
          </div>
        </div>
        <div className="gridItem" style={{ gridArea: "2 / 3 / 3 / 4" }}>
          <img src={product5} alt="Product 5" className="productImage" />
          <div className="hoverOverlay">
            <h3 className="hoverTitle">Product 5</h3>
            <button className="hoverButton">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProducts;
