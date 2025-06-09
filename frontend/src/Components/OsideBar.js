import React from "react";
import "../css/sidebar.css"; 
import { Link } from "react-router-dom";       
function OSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Organization Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/org-dashboard"><a>Dashboard</a></Link>
        </li>
        <li>
          <Link to="/donate-products"><a>Donate</a></Link>
        </li>
        <li>
          <Link to="/org-logout"><a>Logout</a></Link>
        </li>
      </ul>
    </div>
  );
}

export default OSidebar;