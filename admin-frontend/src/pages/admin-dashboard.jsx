import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import { Pie, Bar } from "react-chartjs-2";
import "../css/admin-dashboard.css";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const s = await axios.get("http://localhost:5000/admin/stats");  
    const t = await axios.get("http://localhost:5000/admin/order-trend");

    setStats(s.data);
    setTrend(t.data);
  };

  if (!stats || !trend) return <div>Loading...</div>;

  const productPie = {
    labels: ["Normal", "Discounted", "Expired"],
    datasets: [
      {
        data: [
          stats.shopkeepers.normal_products,
          stats.shopkeepers.discounted_products,
          stats.shopkeepers.expired_products
        ]
      }
    ]
  };

  const orderBar = {
    labels: Object.keys(trend),
    datasets: [
      {
        label: "Orders per Day",
        data: Object.values(trend)
      }
    ]
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar />

      <div className="admin-dashboard-content">

        <h1>Admin Dashboard</h1>

        <h2 className="section-title">Users Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.users.total_users}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card">
            <h3>{stats.users.total_customers}</h3>
            <p>Total Customers</p>
          </div>
          <div className="stat-card">
            <h3>{stats.users.total_shopkeepers}</h3>
            <p>Total Shopkeepers</p>
          </div>
        </div>

        <h2 className="section-title">Customers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.customers.total_orders}</h3>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <h3>₹{stats.customers.total_spending}</h3>
            <p>Total Spending</p>
          </div>
        </div>

        <h2 className="section-title">Shopkeepers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{stats.shopkeepers.total_products}</h3>
            <p>Total Products</p>
          </div>

          <div className="stat-card">
            <h3>{stats.shopkeepers.normal_products}</h3>
            <p>Normal Products</p>
          </div>

          <div className="stat-card">
            <h3>{stats.shopkeepers.discounted_products}</h3>
            <p>Discounted Products</p>
          </div>

          <div className="stat-card">
            <h3>{stats.shopkeepers.expired_products}</h3>
            <p>Expired Products</p>
          </div>
        </div>

        <div className="charts-row">
          <div className="chart-card">
            <h3>Product Distribution</h3>
            <Pie data={productPie} />
          </div>

          <div className="chart-card">
            <h3>Orders in Last 7 Days</h3>
            <Bar data={orderBar} />
          </div>
        </div>

      </div>
    </div>
  );
}
