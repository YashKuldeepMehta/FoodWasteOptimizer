import React,{useState, useEffect} from "react";
import axios from "axios";
import Sidebar from "./SideBar";

const ProductsForSale = () =>{

    const [products, setProducts] = useState([]);
      const [editingProduct, setEditingProduct] = useState(null);
      const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        category: '',
        price: '',
        discounted_price: '',
        expiry_date: ''
      });
    
      useEffect(() => {
        fetch('http://localhost:5000/users/product-sale')
          .then((response) => response.json())
          .then((data) => setProducts(data))
          .catch((error) => console.error('Error fetching products:', error));
      }, []);
    
      const handleEditClick = (product) => {
        setEditingProduct(product._id);
        setUpdatedProduct({
          name: product.name,
          category: product.category,
          price: product.price,
          discounted_price: product.discounted_price,
          expiry_date: new Date(product.expiry_date).toISOString().split('T')[0] 
        });
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
          ...prevProduct,
          [name]: value
        }));
      };
    
      const handleUpdateSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/users/update-product/${editingProduct}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedProduct)
        })
          .then((response) => response.json())
          .then((data) => {
            setProducts((prevProducts) =>
              prevProducts.map((product) =>
                product._id === editingProduct ? data : product
              )
            );
            setEditingProduct(null);
          })
          .catch((error) => console.error('Error updating product:', error));
      };
    
    return (
        <>
          <Sidebar />
          <div className="product-list">
            <h2>Sale Products List</h2>
            <ul className="product-element">
              {products.map((product) => (
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
}

export default ProductsForSale;