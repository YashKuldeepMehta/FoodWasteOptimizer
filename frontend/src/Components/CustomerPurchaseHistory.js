import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "../css/CustomerPurchaseHistory.css";

export default function CustomerPurchaseHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/customer/orders?customer_id=${user._id}`);
      setHistory(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="history-container">
      <Sidebar />

      <div className="history-content">
        <h2>Your Purchase History</h2>

        {history.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          history.map((order) => (
            <div key={order.order_id} className="order-card">
              
              <div className="order-header">
                <h3>Order #{order.order_id.slice(-6).toUpperCase()}</h3>
                <p>{new Date(order.created_at).toLocaleString()}</p>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.product_id}>
                    <div className="item-left">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.qty}</p>
                      <p>Price: ₹{item.price}</p>
                    </div>

                    <div className="item-right">
                      <strong>₹{item.total}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <p><strong>Payment:</strong> {order.payment_method.toUpperCase()}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <h3 className="grand-total">Grand Total: ₹{order.grand_total}</h3>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
