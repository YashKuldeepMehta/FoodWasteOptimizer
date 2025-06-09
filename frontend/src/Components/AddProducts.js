// src/components/AddProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './SideBar';
import '../css/addproducts.css';
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    discounted_price: '',
    expiry_date: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/add-products', product);
      alert('Product added successfully');
      setProduct({
        name: '',
        category: 'vegetables',
        price: '',
        discounted_price: '',
        expiry_date: ''
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <>
    <Sidebar/>
    <form onSubmit={handleSubmit} className='forms'>
      <h2>Add Products</h2>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
      <select name="category" value={product.category} onChange={handleChange}>
        <option value="vegetables">Vegetables</option>
        <option value="snacks">Snacks</option>
        <option value="rice">Rice</option>
        <option value="beverages">Beverages</option>
      </select>
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <input type="number" name="discounted_price" value={product.discounted_price} onChange={handleChange} placeholder="Discounted Price" />
      <input type="date" name="expiry_date" value={product.expiry_date} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
    </>
  );
};

export default AddProduct;
