import React from "react";
import { NavLink } from "react-router-dom";
import "../css/SideBar.css"

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const menu = {
    customer: [
      { name: "Dashboard", path: "/customer/dashboard" },
      { name: "View Discounted Items", path: "/customer/marketplace" },
      { name: "Purchase History", path: "/customer/history" },
      { name: "Cart", path: "/customer/cart" },
      {name: "Logout", path: "/logout"},
    ],

    shopkeeper: [
      { name: "Dashboard", path: "/shopkeeper/dashboard" },
      { name: "Add Inventory", path: "/shopkeeper/add-product" },
      { name: "View Inventory", path: "/shopkeeper/view-products" },
      {name:"Logout", path:"/logout"},
    ],

    restaurant: [
      { name: "Dashboard", path: "/restaurant/dashboard" },
      { name: "Upload Donation", path: "/restaurant/upload" },
      { name: "View Claims", path: "/restaurant/claims" },
      {name:"Logout", path:"/logout"},
    ],

    ngo: [
      { name: "Dashboard", path: "/ngo/dashboard" },
      { name: "Available Donations", path: "/ngo/donations" },
      { name: "Claimed Donations", path: "/ngo/claimed" },
      {name:"Logout", path:"/logout"},
    ],

    admin: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Manage Users", path: "/admin/users" },
      { name: "System Analytics", path: "/admin/analytics" },
    ]
  };

  const items = menu[role] || [];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">{user?.name} {role?.toUpperCase()}</h2>

      <ul className="sidebar-menu">
        {items.map((item, idx) => (
          <li key={idx}>
            <NavLink 
              to={item.path}
              className="sidebar-link"
              activeclassname="active"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
