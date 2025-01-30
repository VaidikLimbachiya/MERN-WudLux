import { useState, useEffect } from "react";
import axios from "axios";
import prev from "../../assets/prev.png";
import next from "../../assets/next.png";
import breadcrumbIcon from "../../assets/home.png"
import { Link } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import "./Order.css";

const API_BASE_URL = "http://localhost:5000";

const OrderHistory = () => {
  const { user } = useUserContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobileMode, setIsMobileMode] = useState(window.innerWidth <= 320);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileMode(window.innerWidth <= 320);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.id) {
        setError("User not found. Please log in.");
        return;
      }

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Unauthorized! Please log in.");
        return;
      }

      try {
        console.log(`Fetching orders for user ID: ${user.id}`); // ✅ Debugging log

        const response = await axios.get(
          `${API_BASE_URL}/api/orders/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ User Orders:", response.data.orders); // ✅ Debugging log

        setOrders(response.data.orders);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="order-history-container">
      <div className="main-content">
      <div className="breadcrumb">
          <img src={breadcrumbIcon} alt="Breadcrumb" />
          <h2 className="btext"> {">"} Order History</h2>
        </div>
        <div className="order-header">
          <h1>Orders</h1>
          <div className="filters">
            <div className="filter-input">
              <input
                type="text"
                placeholder="Search by Order ID"
                className="search-input"
              />
            </div>
            <select className="filter-dropdown">
              <option>Status</option>
            </select>
            <select className="filter-dropdown">
              <option>Show 20</option>
            </select>
          </div>
        </div>

        <div className="order-slider-wrapper">
  <div className="table-wrapper">
    <table className="order-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Total</th>
          <th>Payment</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                  <span className={`status ${order.statusColor}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>
                  <span className={`status ${order.statusColor}`}>
                      {order.paymentStatus}
                    </span>{" "}
                    {/* ✅ Show Payment Status */}
                  </td>
                  <td>
                  <Link to={`/order-details/${encodeURIComponent(order.orderId)}`}>
  <button className="view-button">View</button>
</Link>

                  </td>
                </tr>
              ))}
            </tbody>
    </table>
  </div>
</div>
{/* Pagination */}
        {!isMobileMode ? (
          <div className="pagination">
            <button>
              <img src={prev} alt="Previous" />
            </button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>21</button>
            <button>
              <img src={next} alt="Next" />
            </button>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default OrderHistory;
