import React from "react";
import { NavLink } from "react-router-dom";
import "../css/sidebar.css";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Admin Panel</h2>

      <ul className="admin-menu">
        <li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/admin/status-update">Manage Users</NavLink></li>
        <li><NavLink to="/admin/inventory">All Inventory</NavLink></li>
        <li><NavLink to="/admin/orders">Orders</NavLink></li>
        <li><NavLink to="/admin/reports">Reports</NavLink></li>
      </ul>
    </div>
  );
}
