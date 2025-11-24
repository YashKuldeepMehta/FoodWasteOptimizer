import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "../css/CustomerCheckout.css";

export default function Checkout() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/customer/cart?customer_id=${user._id}`
      );
      setCart(res.data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
    setLoading(false);
  };

  const getGrandTotal = () => {
    return cart
      .filter((i) => i.status === "available")
      .reduce((sum, item) => sum + item.total_price, 0);
  };

  const placeOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address");
      return;
    }

    const payload = {
      customer_id: user._id,
      address,
      payment_method: payment,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/customer/place-order",
        payload
      );
      setMsg(res.data.message);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/customer/orders";
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.detail || "Order failed");
      setTimeout(() => setMsg(""), 2500);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="checkout-container">
      <Sidebar />

      <div className="checkout-content">
        <h2 className="checkout-title">Checkout</h2>

        {msg && <p className="checkout-msg">{msg}</p>}

        <table className="checkout-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Shop</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.cart_id}>
                <td>{item.name}</td>
                <td>{item.shop_name}</td>
                <td>{item.qty_in_cart}</td>
                <td>₹{item.discounted_price}</td>
                <td>₹{item.total_price}</td>
                <td>
                  {item.status === "available" ? (
                    <span className="status ok">Available</span>
                  ) : (
                    <span className="status bad">Unavailable</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="grand-total">
          Grand Total: ₹{getGrandTotal()}
        </h3>

        <label className="form-label">Delivery Address</label>
        <textarea
          placeholder="Enter full address..."
          className="address-box"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label className="form-label">Payment Method</label>
        <select
          className="payment-select"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        >
          <option value="cod">Cash On Delivery</option>
          <option value="card">Card</option>
          <option value="online">Online Payment</option>
        </select>

        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>

        {success && (
          <div className="success-modal">
            <div className="success-box">
              <h3>Order Placed Successfully 🎉</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
