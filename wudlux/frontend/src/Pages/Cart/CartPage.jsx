// import React from "react";
import { useCartContext } from "../../Context/CartContext"; // Use your context
import "./CartPage.css";
import { Link } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const CartPage = () => {
  const { cartItems, totalPrice, updateQuantity, removeItem } =
    useCartContext();

  const cgst = (totalPrice * 0.09).toFixed(2);
  const sgst = (totalPrice * 0.09).toFixed(2);
  const discount = 99;
  const totalPayable = (
    totalPrice +
    parseFloat(cgst) +
    parseFloat(sgst) -
    discount
  ).toFixed(2);

  return (
    <div className="cart-page-container">
      {/* Left Section: Cart Items */}
      <div className="cart-items-section">
        <table className="cart-items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <th>
                <td className="cart-item-details">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div>
                    <h4>{item.name}</h4>
                    <p>Category: {item.category}</p>
                    <p>Size: {item.size}</p>
                  </div>
                </td>
                </th>
                <th>
                <td className="cart-quantity-controls">
                  <button
                    className="cart-quantity-decrement"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="cart-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-quantity-increment"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </td>
                </th>
                <th>
                <td className="cart-item-price">₹{item.price.toFixed(2)}</td>
                </th>
                <th>
                <td className="cart-item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
                </th>
                <th>
                <td>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    <IoCloseCircleOutline />
                  </button>
                </td>
                </th>
               
              </tr>

            ))}
          </tbody>
        </table>
        <button className="cart-continue-shopping">← Continue Shopping</button>
      </div>

      {/* Right Section: Order Summary */}
      <div className="order-summary-section">
        <h3 className="order-summary-title">Order Summary</h3>
        <hr className="order-summary-divider-one" />
        <p className="order-summary-coupon">
          <span>Coupon Code:</span>
          <a href="#apply-coupon" className="order-summary-coupon-code">
            #SALE30
          </a>
        </p>
        <p className="order-summary-total-amount">
          <span>Total Amount:</span>₹{totalPrice.toFixed(2)}
        </p>
        <p className="order-summary-cgst">
          <span>Total CGST:</span>₹{cgst}
        </p>
        <p className="order-summary-sgst">
          <span>Total SGST:</span>₹{sgst}
        </p>
        <p className="order-summary-discount">
          <span>Coupon Discount:</span>
          <strong style={{ color: "#007bff" }}>-₹{discount.toFixed(2)}</strong>
        </p>
        <hr className="order-summary-divider" />
        <p className="order-summary-amount-payable">
          <span className="order-amount">Amount Payable:</span>
          ₹{totalPayable}
        </p>
        <hr className="order-summary-divider" />
        <div className="order-summary-checkout-button">
          <Link to="/checkout">Checkout →</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
