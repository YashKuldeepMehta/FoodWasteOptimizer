import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "../css/AddInventory.css";

export default function AddInventory() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    original_price: "",
    discounted_price: "",
    manufacturing_date: "",
    expiry_date: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        ...form,
        shopkeeper: user._id, 
        original_price: Number(form.original_price),
        discounted_price : Number(form.discounted_price),
        quantity: Number(form.quantity),
      };

      console.log(payload);
      const res = await axios.post("http://localhost:5000/shopkeeper/add-product", payload);

      setMessage("Product added successfully!");

      setForm({
        name: "",
        quantity: "",
        original_price: "",
        discounted_price: "",
        manufacturing_date: "",
        expiry_date: ""
      });

    } catch (err) {
      console.error(err);
      setMessage("Error adding product.");
    }
  };

  return (
    <div className="inventory-add-page">
      <Sidebar />

      <div className="inventory-form-container">
        <h2>Add New Inventory</h2>
        {message && <p className="form-message">{message}</p>}

        <form className="inventory-form" onSubmit={handleSubmit}>
          
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />

          <label>Quantity</label>
          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required />
    
          <label>Original Price</label>
          <input type="number" name="original_price" value={form.original_price} onChange={handleChange} required />

          <label>Discounted Price</label>
          <input type="number" name="discounted_price" value={form.discounted_price} onChange={handleChange} required />

          <label>Manufacturing  Date</label>
          <input type="date" name="manufacturing_date" value={form.manufacturing_date} onChange={handleChange} required />

          <label>Expiry Date</label>
          <input type="date" name="expiry_date" value={form.expiry_date} onChange={handleChange} required />

          <button type="submit">Add Product</button>

        </form>
      </div>
    </div>
  );
}
