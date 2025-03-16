import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { io } from "socket.io-client"; // Import Socket.IO client
import prev from "../../assets/prev.png";
import next from "../../assets/next.png";
// import breadcrumbIcon from "../../assets/home.png";
import { Link } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import "./Order.css";
import Search from "../../assets/Search 2.png";
const API_BASE_URL = "https://mern-wudlux-1-lss8.onrender.com";
const socket = io(API_BASE_URL); // Initialize Socket.IO connection

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // Status Filter
  const [sortOption, setSortOption] = useState("date-desc"); // Sorting
  const [itemsPerPage, setItemsPerPage] = useState(20); // Default: Show 20

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    if (!user?.id) {
      setOrders([]);
      setFilteredOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setOrders([]);
        setFilteredOrders([]);

        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("Unauthorized! Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/orders/user/${user.id}?timestamp=${Date.now()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("User Orders:", response.data.orders);
        console.log("Order Status for Order ID:", orders.orderId, "is:", orders.orderStatus);

        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
        setError("");
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Listen for real-time updates from the server
    socket.on("orderUpdated", ({ orderId, status }) => {
      console.log(`Order ${orderId} updated to status: ${status}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order
        )
      );
    });

    return () => {
      socket.disconnect(); // Disconnect socket when the component unmounts
    };
  }, [user]);

  // 🔹 Filter & Sort Orders
  useEffect(() => {
    let updatedOrders = [...orders];

    // ✅ Apply Search Filter Safely
    if (searchQuery) {
      updatedOrders = updatedOrders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some(
            (item) =>
              item.productId && // ✅ Ensure productId exists
              item.productId.title && // ✅ Ensure title exists
              item.productId.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
      );
    }

    // ✅ Apply Status Filter
    if (filterStatus) {
      updatedOrders = updatedOrders.filter(
        (order) => order.orderStatus === filterStatus
      );
    }

    // ✅ Apply Sorting
    if (sortOption === "date-desc") {
      updatedOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Newest First
    } else if (sortOption === "date-asc") {
      updatedOrders.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ); // Oldest First
    } else if (sortOption === "amount-desc") {
      updatedOrders.sort((a, b) => b.totalAmount - a.totalAmount); // High to Low
    } else if (sortOption === "amount-asc") {
      updatedOrders.sort((a, b) => a.totalAmount - b.totalAmount); // Low to High
    }

    setFilteredOrders(updatedOrders);
  }, [searchQuery, filterStatus, sortOption, orders]);
  const totalPages =
    itemsPerPage === "all"
      ? 1
      : Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex =
    (currentPage - 1) *
    (itemsPerPage === "all" ? filteredOrders.length : itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + (itemsPerPage === "all" ? filteredOrders.length : itemsPerPage)
  );
  useEffect(() => {
    setCurrentPage(1); // Reset to first page on items per page change
  }, [itemsPerPage]);
  

  return (
    <>
      <Breadcrumb />
      
      <div className="order-history-container">
        <div className="main-content">
          {/* Breadcrumb */}
          <div className="breadcrumb"></div>

          <div className="order-header">
            <h2>Orders</h2>
          </div>

          <div className="filters">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by Order ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src={Search} alt="Search Icon" className="search-icon" />
            </div>
            <div className="statusdropdown">
              <select
                className="filter-dropdown"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="datedropdown">
              <select
                className="filter-dropdown"
                value={itemsPerPage}
                onChange={(e) =>
                  setItemsPerPage(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
              >
                <option value="20">Show 20</option>
                <option value="50">Show 50</option>
                <option value="100">Show 100</option>
                <option value="all">Show All</option>
              </select>
            </div>
          </div>

          {/* Order Table */}
          <div className="order-slider-wrapper">
            <div className="table-wrapper">
              {filteredOrders.length > 0 ? (
                <div className="scrollable-table">
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
                      {paginatedOrders.map((order) => (
                        
                        <tr key={order._id}>
                          <td>{order.orderId}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td>₹{order.totalAmount}</td>
                          <td>
                            <span
                              className={`status ${
                                order.paymentStatus === "Completed"
                                  ? "processing"
                                  : "pending"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td>
                          <span
  className={`status ${
    order.orderStatus?.trim().toLowerCase() === "delivered"
      ? "delivered"
      : order.orderStatus?.trim().toLowerCase() === "cancle" || order.orderStatus?.trim().toLowerCase() === "cancelled"
      ? "cancelled"
      : order.orderStatus?.trim().toLowerCase() === "processing"
      ? "processing"
      : order.orderStatus?.trim().toLowerCase() === "pending"
      ? "pending"
      : "unknown" // Default case if status is not recognized
  }`}
>
  {order.orderStatus || "Unknown"}
</span>




                          </td>
                          <td>
                            <Link
                              to={`/order-details/${encodeURIComponent(
                                order.orderId
                              )}`}
                            >
                              <button className="view-button">View</button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-orders-message">
                  No orders found matching your search.
                </p>
              )}
            </div>
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <img src={prev} alt="Previous" />
            </button>

            {/* Generate Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <img src={next} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
