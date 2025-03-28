import { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/orders/list?page=1&limit=50`);
      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        setOrders([]);
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      toast.error("Failed to load orders");
    }
  }, [url]);

  const statusHandler = async (event, mongoId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(`${url}/api/orders/status`, {
        orderId: mongoId,
        status: newStatus
      });
      if (response.data.success) {
        toast.success(`Status updated to ${newStatus}`);
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // Apply slider class to product list if there are more than 5 products
  const handleProductList = (items) => {
    return items.length > 5 ? 'scrollable' : ''; // Add class for scrolling
  };

  return (
    <div className="order-container">
      <h3 className='Text'>Order List</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-item">
              <div className="order-header">
                <p className='Text'><strong className='Text'>Order ID:</strong> {order.orderId}</p>
                <p className='Text'><strong className='Text'>User:</strong> {order.userId?.firstName} {order.userId?.lastName} ({order.userId?.email})</p>
              </div>

              <div className="order-body">
                <p className='Text'><strong className='Text'>Items Ordered:</strong></p>
                <ul className={handleProductList(order.items) }>
  {order.items.map((item, index) => (
    <li key={index} className="order-product">
      <img 
        crossOrigin="anonymous" 
        src={
          item.productId?.images?.[0]?.url 
            ? item.productId.images[0].url 
            : "https://via.placeholder.com/150"
        } 
        alt={item.productId?.title || "Product Image"} 
        className="product-image" 
      />
      <span className="product-title">
        {item.productId?.title || "Unknown Product"} - Qty: {item.quantity}, Price: ₹{item.price}
      </span>
    </li>
  ))}
</ul>


                <p className='Text'><strong className='Text'>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p className='Text'><strong className='Text'>Payment Status:</strong> {order.paymentStatus}</p>
                <p className='Text'><strong className='Text'>Order Status:</strong> {order.orderStatus}</p>

                <div className="order-address">
                  <p><strong className='Text'>Shipping Address:</strong></p>
                  <p className='Text'>{order.shippingAddress.street},</p>
                  <p className='Text'>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
                </div>

                {order.notes && (
                  <p className='Text'><strong className='Text'>Notes:</strong> {order.notes}</p>
                )}
              </div>

              <div className="order-footer">
                <label><strong className='Text'>Update Status:</strong></label>
                <select className='Text' onChange={(event) => statusHandler(event, order.orderId)}>
                  <option className='Text' value="Cancelled">Cancelled</option>
                  <option className='Text'value="Processing">Processing</option>
                  <option className='Text' value="Out for delivery">Out for delivery</option>
                  <option className='Text' value="Delivered">Delivered</option>
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
