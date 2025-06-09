
import React, { useState,useEffect } from 'react';

import {useNavigate,Link}  from 'react-router-dom';
import OSidebar from './OsideBar';
import axios from 'axios';
export const OrgDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        const orgemail = localStorage.getItem("oemail");
        const orgname = localStorage.getItem("oname");

        if (!orgemail) {
            navigate("/organization-login");
        } else {
            try {
                const response = await axios.post('http://localhost:5000/users/fetch-donate', { name: orgname });
                console.log(response.data.products);
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
    };

    fetchData();

    

}, [navigate]);


    return (
        <>
    <OSidebar />
    <div className="product-list">
      <h2>Donated Products</h2>
      <ul className="product-element">
        {products.map((product) => (
          <li key={product._id} className="product-item">
                <h3>{product.name}</h3>
                <p>Product Name: {product.foodProductName}</p>
                <p>Category: {product.category}</p>
                <p>Expiry Date: {new Date(product.expiryDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
      </>
    );
};




