// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import '../css/ProductList.css';
import Sidebar from './SideBar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    fetch('http://localhost:5000/users/view-products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  

  return (
    <>
      <Sidebar />
      <div className="product-list">
        <h2>Product List</h2>
        <ul className="product-element">
          {products.map((product) => (
            <li key={product._id} className="product-item">           
                <>
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>Price: Rs.{product.price.toFixed(2)}</p>
                  {product.is_discounted && (
                    <p className="discounted-price">
                      Discounted Price: Rs.{product.discounted_price.toFixed(2)}
                    </p>
                  )}
                  <p>Expiry Date: {new Date(product.expiry_date).toLocaleDateString()}</p>
                </>
            
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductList;
