
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useNavigate,Link}  from 'react-router-dom';
import UserSidebar from './UserSidebar';

const UserDashboard = () => {
    const navigate = useNavigate();
    const [saleproduct,setSaleProduct] = useState([]);


    useEffect(() => {
      const useremail = localStorage.getItem("uemail");
      if (!useremail) {
          navigate("/user-login");
      } else {
          const fetchProducts = async () => {
              try {
                  const response = await axios.post("http://localhost:5000/users/buy-fetch", { useremail });
                  if (response.data.message === "1") {
                      setSaleProduct(response.data.buyproduct);
                      console.log(response.data.buyproduct);
                  } else {
                    console.log(response.data.message);
                      setSaleProduct([]);
                  }
              } catch (error) {
                  console.error("Error fetching products:", error);
              }
          };
          fetchProducts();  
      }
  }, [navigate]);  
  

    return (
        <>
      
       <UserSidebar/>
       <div className="product-list">
            <h2>Previous Buys List</h2>
            <ul className="product-element">
              {saleproduct.map((product) => (
                <li key={product._id} className="product-item">               
                    <>
                      <h3>{product.name}</h3>
                      <p>Category: {product.category}</p>
                      <p>Price: Rs.{product.price.toFixed(2)}</p>
                      <p>Expiry Date: {new Date(product.expiry_date).toLocaleDateString()}</p>
                    </>
                </li>
              ))}
            </ul>
          </div>
      </>
    );
};

export default UserDashboard;