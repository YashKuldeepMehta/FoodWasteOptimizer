import React from "react";
import "../css/sidebar.css"; 
import { Link } from "react-router-dom";   

function UserSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>User Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/user-dashboard"><a>Dashboard</a></Link>
          </li>
        <li>
          <Link to="/user-buy"><a>Buy Product</a></Link>
        </li>

        <li>
          <Link to="/user-logout"><a>Logout</a></Link>
        </li>
      </ul>
    </div>
  );
}

export default UserSidebar;