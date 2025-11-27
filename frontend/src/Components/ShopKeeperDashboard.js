import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar"
import axios from "axios";
import "../css/ShopKeeperDashboard.css"

export default function ShopkeeperDashboard() {
  const navigate = useNavigate()
  const [inventory, setInventory] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/shopkeeper/products?shopkeeper=${user._id}`
      );

      setInventory(res.data);

      const soon = res.data.filter(item => {
        if(item.is_discounted === true && item.is_expired === false){
          return item;
        }
      });
      setExpiringSoon(soon);

      setLoading(false);
    } catch (error) {
      console.error("Error loading inventory:", error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="shopkeeper-dashboard">
      <Sidebar />

      <div className="dashboard-content">

        <div className="welcome-card">
          <h2>Welcome, {user?.name}</h2>
          <p>Manage your inventory and track expiry alerts.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{inventory.length}</h3>
            <p>Total Inventory Batches</p>
          </div>

          <div className="stat-card">
            <h3>{expiringSoon.length}</h3>
            <p>Expiring Soon</p>
          </div>
        </div>

        <button 
          className="add-btn"
          onClick={() => navigate("/shopkeeper/add-product")}
        >
          + Add New Item
        </button>

        <h3 className="section-title">Inventory</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Price(Per Qty)</th>
              <th>Discounted</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.slice(0,5).map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{new Date(item.expiry_date).toLocaleDateString()}</td>
                <td>{item.quantity}</td>
                <td>₹{item.original_price}</td>
                <td>{item.is_discounted ? "Yes" : "No"}</td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => window.location.href=`/shopkeeper/edit/${item._id}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="view-full-btn" onClick={() => navigate("/shopkeeper/view-products")}>See Full Inventory → </button>

        <h3 className="section-title">Expiring Within 7 Days</h3>

        {expiringSoon.length === 0 ? (
          <p>No items expiring soon.</p>
        ) : (
          <div className="alert-grid">
            {expiringSoon.map(item => (
              <div className="alert-card" key={item._id}>
                <h4>{item.name}</h4>
                <p>Expiry: {new Date(item.expiry_date).toLocaleDateString()}</p>
                <p>Qty: {item.quantity}</p>
                {item.is_discounted ? (
                  <span className="discount-label">Already Discounted</span>
                ) : (
                  <span className="danger-label">Needs Discount</span>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
