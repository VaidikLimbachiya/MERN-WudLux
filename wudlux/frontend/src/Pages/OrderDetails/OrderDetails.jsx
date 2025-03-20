import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./OrderDetails.css";
import customer from "../../assets/customer.png";
import shiping from "../../assets/shiping.png";
import mastercard from "../../assets/mastercard.png";
import print from "../../assets/print.png";

const API_BASE_URL = "https://mern-wudlux-1-lss8.onrender.com";

const OrderSummary = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Unauthorized! Please log in.");
        return;
      }

      try {
        console.log(`Fetching order details for Order ID: ${orderId}`);

        const encodedOrderId = encodeURIComponent(orderId);
        const response = await axios.get(`${API_BASE_URL}/api/orders/${encodedOrderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("  API Response:", response.data); // Debugging
        setOrder(response.data.order);
      } catch (error) {
        console.error("❌ Error fetching order details:", error);
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);
  const handlePrint = () => {
  const doc = new jsPDF();

  // Header
    // Branding
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("WUDLUX DECOR", 14, 20);
    doc.text("INVOICE", 160, 20, { align: "right" });
  
    // Invoice Info
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${order.orderId || "N/A"}`, 14, 30);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 35);
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 40);
  
    // Customer & Shipping Info
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 14, 50);
    doc.text("Ship To:", 105, 50);
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${order.userId?.firstName} ${order.userId?.lastName || ""}`, 14, 55);
    doc.text(`${order.userId?.email || ""}`, 14, 60);
  
    doc.text(`${order.shippingAddress?.street || "N/A"}`, 105, 55);
    doc.text(`${order.shippingAddress?.city || ""}, ${order.shippingAddress?.state || ""}`, 105, 60);
    doc.text(`${order.shippingAddress?.zipCode || ""}, ${order.shippingAddress?.country || ""}`, 105, 65);

  // Product Table
  const rows = order.items.map((item) => [
    item.productId?.title || "Unknown Product",
    item.quantity || "0",
    `₹${item.price?.toFixed(2) || "0.00"}`,
    `₹${((item.quantity || 0) * (item.price || 0)).toFixed(2)}`
  ]);

  doc.autoTable({
    head: [['Product', 'Quantity', 'Price', 'Total']],
    body: rows,
    startY: 80,
    styles: { fontSize: 10 },
  });

  // Totals
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Total Amount: ₹${summary.totalAmount.toFixed(2)}`, 14, finalY);
  doc.text(`Total CGST: ₹${summary.cgst.toFixed(2)}`, 14, finalY + 6);
  doc.text(`Total SGST: ₹${summary.sgst.toFixed(2)}`, 14, finalY + 12);
  doc.text(`Discount: ₹${summary.discount.toFixed(2)}`, 14, finalY + 18);
  doc.setFontSize(12);
  doc.text(`Grand Total: ₹${summary.grandTotal.toFixed(2)}`, 14, finalY + 28);

  // Payment Method
  doc.setFontSize(10);
  doc.text(`Payment Method: ${order.paymentMethod?.toUpperCase() || "N/A"}`, 14, finalY + 38);

  doc.setFontSize(16);
doc.text(`Thank you for choosing Wudlux Decor!
`, 105, finalY + 48, { align: 'center' });

  doc.save(`Invoice-${order.orderId || "Order"}.pdf`);
};
  
  
  


  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!order) return <p>No order details found.</p>;

  //   Dynamically Calculate Order Summary
  const summary = {
    totalAmount: order.totalAmount || 0,
    cgst: order.cgst || 0,
    sgst: order.sgst || 0,
    discount: order.discount || 0,
    grandTotal: (order.totalAmount || 0) - (order.discount || 0),
  };

  return (
    <div className="order-summary-container">
      {/* Header Section */}
      <div className="header-container">
        <div className="left-section">
          <div className="date-info">
            <p>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "Date Unavailable"}</p>
            <div className="payment-status">
              <p>Payment Status:</p>
              <span className={`status ${order.paymentStatus?.toLowerCase() || "unknown"}`}>
                {order.paymentStatus || "Unknown"}
              </span>
            </div>
          </div>
        </div>
        <div className="invoice-section">
          <div className="invoice-content">
            <p>Invoice: <span className="bold">{order.orderId || "N/A"}</span></p>
            <p>Issue Date: <span className="bold">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</span></p>
            <p>Amount: <span className="bold">₹{summary.totalAmount.toFixed(2)}</span></p>
          </div>
          <div className="print-icon" onClick={handlePrint} style={{ cursor: "pointer" }}>
            <img src={print} alt="Print Icon" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Customer and Address Info */}
      <div className="info-section">
        <div className="info-box">
          <div className="icon-title">
            <img src={customer} alt="Customer Icon" className="info-icon" loading="lazy"/>
            <h4>Customer Info</h4>
          </div>
          <p>Name: {order.userId?.firstName} {order.userId?.lastName || "Unknown User"}</p>
          <p>Email: {order.userId?.email || "No Email Available"}</p>
        </div>

        <div className="info-box">
          <div className="icon-title">
            <img src={shiping} alt="Shipping Icon" className="info-icon" loading="lazy"/>
            <h4>Shipping Address</h4>
          </div>
          <p>
            {order.shippingAddress?.street || "Street Unavailable"}, {order.shippingAddress?.city || "City Unavailable"},
            {order.shippingAddress?.state || "State Unavailable"}
          </p>
          <p>{order.shippingAddress?.zipCode || "Zip Unavailable"}, {order.shippingAddress?.country || "Country Unavailable"}</p>
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
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <tr key={index}>
                <td className="product-info">
                  <div className="product-details">
                    <img
                      crossOrigin="anonymous"
                      src={
                        item.productId?.images?.[0]?.url
                          ? item.productId.images[0].url
                          : "https://via.placeholder.com/150"
                      }                      
                      alt={item.productId?.title || "Unknown Product"}
                      className="product-image"
                    />
                    <span className="productTitle">{item.productId?.title || "Product Name Unavailable"}</span>
                  </div>
                </td>
                <td>{item.quantity || "0"}</td>
                <td>₹{item.price?.toFixed(2) || "0.00"}</td>
                <td>₹{((item.quantity || 0) * (item.price || 0)).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found in this order.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Order Summary */}
      <div className="summary-section">
        <div className="summary-item"><span>Total Amount:</span><span>₹{summary.totalAmount.toFixed(2)}</span></div>
        <div className="summary-item"><span>Total CGST:</span><span>₹{summary.cgst.toFixed(2)}</span></div>
        <div className="summary-item"><span>Total SGST:</span><span>₹{summary.sgst.toFixed(2)}</span></div>
        <div className="summary-item"><span>Coupon Discount:</span><span className="discountt">₹{summary.discount.toFixed(2)}</span></div>
        <div className="grand-total"><span>Grand Total:</span><span>₹{summary.grandTotal.toFixed(2)}</span></div>
      </div>

      {/* Payment Info */}
      <div className="payment-info">
        <h4>Payment Info</h4>
        <div className="payment-details">
          <div className="card-info">
            <img src={mastercard} alt="MasterCard Logo" className="card-logo" loading="lazy"/>
            <span>{order.paymentMethod?.toUpperCase() || "NOT PROVIDED"}</span>
          </div>
          <p>Business Name: {order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : "Unknown User"}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
