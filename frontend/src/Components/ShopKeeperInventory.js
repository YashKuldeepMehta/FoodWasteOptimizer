import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "../css/ShopKeeperInventory.css";

export default function ViewInventory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/shopkeeper/products?shopkeeper=${user._id}`
      );

      setInventory(res.data);
      setLoading(false);

    } catch (error) {
      console.error("Error loading inventory:", error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const filteredInventory = inventory.filter((item) => {
    if (filter === "discounted") return item.is_discounted === true;
    if (filter === "expired") return item.is_expired === true;
    if (filter === "normal")
      return !item.is_discounted && !item.is_expired;
    return true;
  });

  return (
    <div className="inventory-page">
      <Sidebar />

      <div className="inventory-content">
        <h2>Your Inventory</h2>

        <div className="filter-section">
          <label>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">All Products</option>
            <option value="normal">Normal Products</option>
            <option value="discounted">Discounted</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Original Price</th>
              <th>Discounted Price</th>
              <th>Mfg Date</th>
              <th>Expiry Date</th>
              <th>is Discounted?</th>
              <th>is Expired?</th>
            </tr>
          </thead>

          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.original_price}</td>
                <td>{item.discounted_price ? "₹" + item.discounted_price : "-"}</td>
                <td>{new Date(item.manufacturing_date).toLocaleDateString()}</td>
                <td>{new Date(item.expiry_date).toLocaleDateString()}</td>
                <td>{item.is_discounted ? "Yes" : "No"}</td>
                <td>{item.is_expired ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
