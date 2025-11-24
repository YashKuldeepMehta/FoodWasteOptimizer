import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./SideBar";
import "../css/CustomerDashboard.css";

export default function CustomerDashboard() {
  const [discountedItems, setDiscountedItems] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const itemsRes = await axios.get("http://localhost:5000/customer/discounted");
      const orderRes = await axios.get(`http://localhost:5000/customer/orders?customer_id=${user._id}`);

      setPurchaseHistory(orderRes.data);
      setDiscountedItems(itemsRes.data);
      setLoading(false);
      console.log(discountedItems)
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-screen">Loading...</div>;

  return (
    <div className="new-dashboard-container">

      <Sidebar />

      <div className="new-dashboard-content">

        <div className="welcome-header">
          <h2>Hello, {user?.name}</h2>
          <p>Your Dashboard.</p>
        </div>

        <div className="stats-section">
          <div className="stat-box">
            <h1>{discountedItems.length}</h1>
            <p>Discounted Items</p>
          </div>

          <div className="stat-box">
            <h1>{purchaseHistory.length}</h1>
            <p>Purchases Made</p>
          </div>

          <div className="stat-box">
            <h1>₹{purchaseHistory.reduce((t, i) => t + i.grand_total, 0)}</h1>
            <p>Total Spent</p>
          </div>
        </div>

        <div className="section-title-row">
          <h3>Discounted Items</h3>
          <button className="view-btn" onClick={() => navigate("/customer/marketplace")}>View All</button>
        </div>

        <div className="discount-scroll">
          {discountedItems.slice(0, 3).map((item) => {
            const today = new Date();
            const exp = new Date(item.expiry_date);
            const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

            return (
              <div className="discount-card" key={item._id}>
                <h4>{item.name}</h4>
                <p className="price">₹{item.discounted_price}</p>

                <p className="expiry-days">
                  Expires in:{" "}
                  <span className={daysLeft <= 2 ? "danger" : ""}>
                    {daysLeft} days
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
