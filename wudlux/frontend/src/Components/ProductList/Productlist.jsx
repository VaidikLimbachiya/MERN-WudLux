// import React from "react";
import "./Productlist.css";
import product1 from "../../assets/product1.png";
import product2 from "../../assets/product2.png";
import product3 from "../../assets/product3.png";
import product4 from "../../assets/product4.png";
import product5 from "../../assets/product5.png";
import product6 from "../../assets/product6.png";
import product7 from "../../assets/product7.png";
import product8 from "../../assets/product8.png";
import bagIcon from "../../assets/bag.png"; // Import the bag icon
import { useCartContext } from "../../Context/CartContext"; // Correct import

const products = [
  {
    id: 1,
    image: product1,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
  {
    id: 2,
    image: product2,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
  {
    id: 3,
    image: product3,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
  {
    id: 4,
    image: product4,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
  {
    id: 5,
    image: product5,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
  {
    id: 6,
    image: product6,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
  {
    id: 7,
    image: product7,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
  {
    id: 8,
    image: product8,
    title: "Aliquam lobortis est turpis mauris ...",
    price: 299.0,
    originalPrice: 499.0,
    discount: "-60%",
  },
];

const Productlist = () => {
  const { addToCart, cartItems = {} } = useCartContext(); // Ensure cartItems is initialized

  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <div className="product-list-card" key={product.id}>
          <div className="product-list-image-wrapper">
            <img src={product.image} alt={product.title} className="product-list-image" />
            <div className="product-list-discount-badge">{product.discount}</div>
            <div className="product-list-bag-button-wrapper">
              <button
                className="product-list-bag-button"
                onClick={() => addToCart(product)} // Dispatch ADD_TO_CART action
              >
                <img src={bagIcon} alt="Bag Icon" className="product-list-bag-icon" />
                {cartItems[product.id]?.quantity ? "Add to Bag" : "Add to Bag"}
              </button>
            </div>
          </div>
          <div className="product-list-details">
            <p className="product-list-title">{product.title}</p>
            <div className="product-list-price-details">
              <span className="product-list-current-price">₹{product.price.toFixed(2)}</span>
              <span className="product-list-original-price">₹{product.originalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Productlist;
