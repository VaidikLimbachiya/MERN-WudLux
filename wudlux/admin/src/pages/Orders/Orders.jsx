import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/orders/list`);
      console.log("Fetched Orders:", response.data); // Debugging

      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Prevents undefined state
      toast.error("Failed to load orders");
    }
  }, [url]);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="order-container">
      <h3>Order List</h3>
      <div className="order-list">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <div className="order-header">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>User:</strong> {order.userId?.firstName} {order.userId?.lastName} ({order.userId?.email})</p>
              </div>
              
              <div className="order-body">
                <p><strong>Items Ordered:</strong></p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index} className="order-product">
                      <img 
                        crossOrigin='anonymous' 
                        src={item.productId?.images ? `http://localhost:5000/uploads/${item.productId.images}` : 'http://localhost:5000/uploads/default.png'} 
                        alt={item.productId?.title || "Product Image"} 
                        className="product-image" 
                      />
                      <span className="product-title">
                        {item.productId?.title || "Unknown Product"} - Qty: {item.quantity}, Price: ₹{item.price}
                      </span>
                    </li>
                  ))}
                </ul>

                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                <p><strong>Order Status:</strong> {order.orderStatus}</p>

                <div className="order-address">
                  <p><strong>Shipping Address:</strong></p>
                  <p>{order.shippingAddress.street},</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
                </div>

                {order.notes && (
                  <p><strong>Notes:</strong> {order.notes}</p>
                )}
              </div>

              <div className="order-footer">
                <label><strong>Update Status:</strong></label>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.orderStatus}>
                  <option value="Cancle">Cancle</option>
                  <option value="Processing">Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

Orders.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Orders;
