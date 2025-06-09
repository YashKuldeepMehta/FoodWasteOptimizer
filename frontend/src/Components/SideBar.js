import React from "react";
import "../css/sidebar.css"; 
import { Link } from "react-router-dom";       
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/admin-dashboard"><a>Dashboard</a></Link>
        </li>
        <li>
          <Link to="/view-products"><a>View Products</a></Link>
        </li>
        <li>
          <Link to="/add-products"><a>Add Products</a></Link>
        </li>
        <li>
          <Link to="/sale-products"><a>Products on Sale</a></Link>
        </li>
        <li>
          <Link to="/logout"><a>Logout</a></Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;