import React from "react";
import "./OrderDetails.css";
import customer from "../../assets/customer.png";
import shiping from "../../assets/shiping.png";
import billing from "../../assets/bill.png";
import main from "../../assets/main.png";
import mastercard from "../../assets/mastercard.png";
import print from "../../assets/print.png";

const OrderSummary = () => {
  const customerInfo = {
    name: "Meghna Sheth",
    email: "meghna_sheth@gmail.com",
    phone: "9632587412",
  };

  const shippingAddress = "B-502, Safal Pegasus, Prahlad Nagar, Ahmedabad, Gujarat 380015";
  const billingAddress = "J-305, Krishna road, Opp. HDFC bank, Ahmedabad, Gujarat, India";

  const products = [
    { name: "Chopper Board", quantity: 2, price: 299.0, total: 499.0 },
    { name: "Butcher Board", quantity: 2, price: 199.0, total: 299.0 },
    { name: "Serving Tray", quantity: 2, price: 299.0, total: 299.0 },
    { name: "Chopper Board", quantity: 2, price: 299.0, total: 299.0 },
    { name: "Chopper Board", quantity: 2, price: 299.0, total: 299.0 },
  ];

  const paymentInfo = {
    method: "Master Card **** **** 4768",
    businessName: "Meghna Sheth",
    phone: "9632587412",
  };

  const summary = {
    totalAmount: 1695.0,
    cgst: 13.56,
    sgst: 13.56,
    discount: -99.0,
    grandTotal: 1623.3,
  };

  const invoiceInfo = [
    { label: "Invoice:", value: "#INV-0758267" },
    { label: "Issue Date:", value: "23 April 2024" },
    { label: "Due Date:", value: "23 April 2024" },
    { label: "Amount:", value: "₹1,623.30" },
  ];

  return (
    <div className="order-summary-container">
      {/* Enhanced Header Section */}
      <div className="header-container">
        <div className="left-section">
          <div className="date-info">
            <p>Wed, Aug 13, 2020, 4:34PM</p>
            <div className="payment-status">
              <p>Payment Status:</p>
              <span className="status completed">Completed</span>
            </div>
          </div>
        </div>
        <div className="invoice-section">
  <div className="invoice-content">
    <p>
      Invoice: <span className="bold">#INV-0758267</span>
    </p>
    <p>
      Issue Date: <span className="bold">23 April 2024</span>
    </p>
    <p>
      Due Date: <span className="bold">23 April 2024</span>
    </p>
    <p>
      Amount: <span className="bold">₹1,623.30</span>
    </p>
  </div>
  <div className="print-icon">
    <img src={print} alt="Print Icon" />
  </div>
</div>

      </div>

      {/* Customer and Address Info */}
      <div className="info-section">
      <div className="info-box">
        <div className="icon-title">
          <img src={customer} alt="Customer Icon" className="info-icon" />
          <h4>Customer Info</h4>
        </div>
        <p>{customerInfo.name}</p>
        <p>{customerInfo.email}</p>
        <p>{customerInfo.phone}</p>
      </div>

      <div className="info-box">
        <div className="icon-title">
          <img src={shiping} alt="Shipping Icon" className="info-icon" />
          <h4>Shipping Address</h4>
        </div>
        <p>{shippingAddress}</p>
      </div>

      <div className="info-box">
        <div className="icon-title">
          <img src={billing} alt="Billing Icon" className="info-icon" />
          <h4>Billing Address</h4>
        </div>
        <p>{billingAddress}</p>
      </div>
    </div>

      {/* Product Table */}
      <table className="product-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product, index) => (
      <tr key={index}>
        <td className="product-info">
          <div className="product-details">
            <img
              src={main}
              alt={product.name}
              className="product-image"
            />
            <span>{product.name}</span>
          </div>
        </td>
        <td>{product.quantity}</td>
        <td>₹{product.price.toFixed(2)}</td>
        <td>₹{product.total.toFixed(2)}</td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Summary Section */}
      <div className="summary-section">
  <div className="summary-item">
    <span>Total Amount:</span>
    <span>₹{summary.totalAmount.toFixed(2)}</span>
  </div>
  <div className="summary-item">
    <span>Total CGST:</span>
    <span>₹{summary.cgst.toFixed(2)}</span>
  </div>
  <div className="summary-item">
    <span>Total SGST:</span>
    <span>₹{summary.sgst.toFixed(2)}</span>
  </div>
  <div className="summary-item">
    <span>Coupon Discount:</span>
    <span className="discountt">₹{summary.discount.toFixed(2)}</span>
  </div>
  <div className="grand-total">
    <span>Grand Total:</span>
    <span>₹{summary.grandTotal.toFixed(2)}</span>
  </div>
</div>


      {/* Payment Info */}
      <div className="payment-info">
  <h4>Payment Info</h4>
  <div className="payment-details">
    <div className="card-info">
      <img
        src={mastercard}
        alt="MasterCard Logo"
        className="card-logo"
      />
      <span>{paymentInfo.method}</span>
    </div>
    <p>Business Name: {paymentInfo.businessName}</p>
    <p>Phone: {paymentInfo.phone}</p>
  </div>
</div>
</div>
  );
};

export default OrderSummary;
