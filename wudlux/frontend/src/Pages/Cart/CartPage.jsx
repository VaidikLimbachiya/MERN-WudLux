import { useEffect, useState } from "react";
import { useCartContext } from "../../Context/CartContext"; // Use your context
import "./CartPage.css";
import { Link } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";

const CartPage = () => {
  const { cartItems, totalPrice, updateQuantity, removeItem } =
    useCartContext();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <>
      {/* Header Section */}
      <div className="cart-header-container">
        <div className="cart-header">
          <h1 className="cart-title">My Shopping Cart</h1>
          <p className="cart-subtitle">
            Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque libero
            est.
          </p>
        </div>
      </div>

      {/* Main Page Container */}
      <div className="cart-page-container">
        {/* Left Section: Cart Items */}
        <div className="cart-items-section">
          {isMobile ? (
            cartItems.map((item) => (
              <div className="cart-item-card" key={item._id || item.id}>
                <div className="cart-item-details">
                  <img
                    crossOrigin="anonymous"
                    src={
                      item.images
                        ? `https://mern-wudlux-1-lss8.onrender.com/uploads/${item.images}`
                        : "placeholder.png"
                    }
                    alt={item.name || "Product image"}
                    className="cart-item-image"
                    loading="lazy"
                  />
                  <div className="cart-item-info">
                    <h4>{item.title || "Unnamed Product"}</h4>
                    <p>Category: {item.category || "No category"}</p>
                    <p className="cart-item-size">
                      Size:
                      {Array.isArray(item.size)
                        ? item.size
                            .map(
                              (size) => `L-${size.L} B-${size.B} H-${size.H}`
                            )
                            .join(", ")
                        : item.size
                        ? `L-${item.size.L} B-${item.size.B} H-${item.size.H}`
                        : "No size available"}
                    </p>
                  </div>
                </div>

                <div className="cart-bottom-row">
                  {/* Quantity Controls */}
                  <div className="cart-quantity-controls">
                    <button
                      className="cart-quantity-decrement"
                      onClick={() => updateQuantity(item.productId, -1)}
                    >
                      -
                    </button>
                    <span className="cart-quantity-value">{item.quantity}</span>
                    <button
                      className="cart-quantity-increment"
                      onClick={() => updateQuantity(item.productId, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="cart-item-remove-btn"
                    onClick={() => removeItem(item.productId)}
                  >
                    <RiDeleteBin2Line />
                  </button>

                  {/* Price */}
                  <div className="cart-item-price">
                    ₹{item.price?.toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <table className="cart-items-table">
              <thead>
                <tr className="tableHeader">
                  <th className="productTH">Product</th>
                  <th className="productData">Quantity</th>
                  <th className="productData">Price</th>
                  <th className="productData">Total</th>
                  <th className="productData"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr className="tableRow" key={item._id || item.id}>
                    <td className="cart-item-details">
                      <img
                        crossOrigin="anonymous"
                        src={
                          item.images
                            ? `https://mern-wudlux-1-lss8.onrender.com/uploads/${item.images}`
                            : "placeholder.png"
                        }
                        alt={item.name || "Product image"}
                        className="cart-item-image"
                        loading="lazy"
                      />
                      <div className="cart-item-info">
                        <h4>{item.title || "Unnamed Product"}</h4>
                        <p>Category: {item.category || "No category"}</p>
                        <p className="cart-item-size">
                          Size:
                          {Array.isArray(item.size)
                            ? item.size
                                .map(
                                  (size) =>
                                    `L-${size.L} B-${size.B} H-${size.H}`
                                )
                                .join(", ")
                            : item.size
                            ? `L-${item.size.L} B-${item.size.B} H-${item.size.H}`
                            : "No size available"}
                        </p>
                      </div>
                    </td>
                    <td className="cart-quantity-controls">
                      <button
                        className="cart-quantity-decrement"
                        onClick={() => updateQuantity(item.productId, -1)}
                      >
                        -
                      </button>
                      <span className="cart-quantity-value">
                        {item.quantity}
                      </span>
                      <button
                        className="cart-quantity-increment"
                        onClick={() => updateQuantity(item.productId, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="cart-item-price">
                      ₹{item.price ? item.price.toFixed(2) : "0.00"}{" "}
                      {/*   Fix */}
                    </td>
                    <td className="cart-item-total">
                      ₹
                      {item.price
                        ? (item.price * item.quantity).toFixed(2)
                        : "0.00"}{" "}
                      {/*   Fix */}
                    </td>
                    <td>
                      <button
                        className="cart-item-remove-btn"
                        aria-label="Remove item"
                        onClick={() => removeItem(item.productId)}
                      >
                        <span className="cart-item-remove-icon">✖</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Link
            to="/products"
            className="cart-continue-shopping"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ← Continue Shopping
          </Link>
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
            <strong style={{ color: "#007bff" }}>
              -₹{discount.toFixed(2)}
            </strong>
          </p>
          <hr className="order-summary-divider" />
          <p className="order-summary-amount-payable">
            <span className="order-amount">Amount Payable:</span>
            <span className="total-amount"> ₹{totalPayable}</span>
          </p>
          <hr className="order-summary-divider" />
          <Link to="/checkout">
            <div className="order-summary-checkout-button">Checkout →</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartPage;
