import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "../css/CustomerCart.css";
import { useNavigate } from "react-router-dom";

export default function CartPage() {

  const user = JSON.parse(localStorage.getItem("user"));
  const [cart,setCart] = useState([]);
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState("");
  const navigate  = useNavigate()

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try{
      const res = await axios.get(
        `http://localhost:5000/customer/cart?customer_id=${user._id}`
      );
      setCart(res.data);
      setLoading(false);
    }catch(err){
      console.error(err);
      setLoading(false);
    }
  };

  const updateQty = async (cartId,newQty) => {
    try{
      const res = await axios.put("http://localhost:5000/customer/cart/update", {
        cart_id: cartId,
        quantity: newQty
      });

      setMessage(res.data.message);
      fetchCart();
      setTimeout(()=>{
        setMessage("")
      },1500)
    }catch(err){
      setMessage(err.response?.data?.detail);
    }
  };

  const removeItem = async (cartId) => {
    await axios.delete(`http://localhost:5000/customer/cart/remove/${cartId}`);
    fetchCart();
  };

  if(loading) return <div className="loading">Loading...</div>;

  const totalCartValue = cart.reduce((acc,i) => acc + i.total_price,0);

  return (
    <div className="cart-container">
      <Sidebar />

      <div className="cart-content">

        <h2>Your Cart</h2>

        {message && <p className="cart-message">{message}</p>}

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.cart_id} className="cart-item">

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>From: {item.shop_name}</p>
                  <p>₹{item.discounted_price}</p>

                  {item.status === "expired" && (
                    <p className="expired-text">Expired — remove this item</p>
                  )}

                  {item.status === "out_of_stock" && (
                    <p className="danger-text">Out of Stock</p>
                  )}
                </div>

                <div className="item-controls">

                  <input 
                    type="number"
                    min="1"
                    max={item.stock_available}
                    disabled={item.status !== "available"}
                    value={item.qty_in_cart}
                    onChange={(e) => updateQty(item.cart_id,Number(e.target.value))}
                  />

                  <button className="remove-btn"
                    onClick={() => removeItem(item.cart_id)}>
                    Remove
                  </button>
                </div>

                <div className="item-total">
                  ₹{item.total_price}
                </div>

              </div>
            ))}

            <div className="cart-summary">
              <h3>Total: ₹{totalCartValue}</h3>
              <button className="checkout-btn" onClick={()=> navigate("/customer/checkout")}>Checkout</button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
