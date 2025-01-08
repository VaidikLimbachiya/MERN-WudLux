// import React from "react";
import "./Order.css";
import prev from "../../assets/prev.png";
import next from "../../assets/next.png";
import breadcrumbIcon from "../../assets/home.png"; // Replace with the correct path to your breadcrumb image

const navItems = [
  {
    id: "orders",
    label: "Order History",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/163ad495a8d423ba0d335e16843aaca0873363609b3486d91bd349e743d41350",
    active: true,
  },
  {
    id: "addresses",
    label: "Addresses",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/893b1c5b721df8413e4e4d2beb9e36a0415d02afbfb6e9b925a30a9f3a8f5275",
    active: false,
  },
  {
    id: "logout",
    label: "Logout",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4416fa9e173b2dffe1ec95cc99ae26ca914227a03beb84d7306598352d24367",
    active: false,
  },
];

const OrderHistory = () => {
  const orders = [
    {
      id: "#WU3658",
      date: "19-12-2024",
      total: "₹1,695.00",
      payment: "Paid",
      status: "Processing",
      statusColor: "processing",
    },
    {
      id: "#WU3223",
      date: "10-02-2024",
      total: "₹3,699.00",
      payment: "Paid",
      status: "Delivered",
      statusColor: "delivered",
    },
    {
      id: "#WU3002",
      date: "29-08-2023",
      total: "₹2,699.00",
      payment: "Refund",
      status: "Cancelled",
      statusColor: "cancelled",
    },
    {
      id: "#WU2560",
      date: "13-04-2023",
      total: "₹2,698.00",
      payment: "Paid",
      status: "Delivered",
      statusColor: "delivered",
    },
    {
      id: "#WU2203",
      date: "25-02-2022",
      total: "₹4,695.00",
      payment: "Paid",
      status: "Delivered",
      statusColor: "delivered",
    },
  ];

  return (
    <div className="order-history-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <img src={breadcrumbIcon} alt="Breadcrumb" />
          <h2 className="btext"> {'>'} Order History</h2>
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
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>{order.payment}</td>
                <td>
                  <span className={`status ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button className="view-button">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default OrderHistory;
