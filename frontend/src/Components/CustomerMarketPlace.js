import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./SideBar";
import "../css/CustomerMarketPlace.css";

export default function CustomerMarketplace() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState({});

  const [message,setMessage] = useState("")

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchDiscountedItems();
  }, []);

  const fetchDiscountedItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/customer/discounted');

      const withExpiry = res.data.map(item => {
        const today = new Date();
        const exp = new Date(item.expiry_date);
        const diff = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

        return { ...item, daysToExpiry: diff };
      });
      

      setItems(withExpiry);
      setLoading(false);
    } catch (err) {
      console.error("Error loading items:", err);
      setLoading(false);
    }
  };

  const handleQtyChange = (id, value) => {
    setQty({ ...qty, [id]: value });
  };

  const addToCart = async (item) => {
    const selectedQty = qty[item._id] || 1;

    const payload = {
      product_id : item._id,
      customer_id : user._id,
      quantity : selectedQty,
      price : item.discounted_price 
    }

    try{
        const res = await axios.post("http://localhost:5000/customer/addtocart",payload)

        setMessage(res.data.message);
        setTimeout(()=>{
          setMessage("");
        },2000);
    }catch(err){
        setMessage(err.response?.data?.detail || "Error adding to cart");
        setTimeout(() => setMessage(""), 2000);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="marketplace-container">
      <Sidebar />

      <div className="marketplace-content">

        <h2 className="marketplace-title">Your Marketplace</h2>
        <p className="subtitle">Discover discounted items from shopkeepers</p>

        {message && <p className="cart-message">{message}</p>}

        <div className="market-grid">
          {items.map((item) => (
            <div className="market-card" key={item._id}>

              <h3 className="product-name">{item.name}</h3>

              <p className="shop-name">
                By: <strong>{item.shop_name}</strong>
              </p>

              <p className="price">
                ₹{item.discounted_price}
                <span className="original">₹{item.original_price}</span>
              </p>

              <p className="qty-info">
                Stock Available: <strong>{item.quantity}</strong>
              </p>

              <p className="expiry">
                Expires in: 
                <span className={item.daysToExpiry <= 3 ? "danger" : ""}>
                  {item.daysToExpiry} days
                </span>
              </p>

              <div className="qty-slider">
                <label>Qty: {qty[item._id] || 1}</label>
                <input
                  type="range"
                  min="1"
                  max={item.quantity}
                  value={qty[item._id] || 1}
                  onChange={(e) => handleQtyChange(item._id, e.target.value)}
                />
              </div>

              <button className="cart-btn" onClick={() => addToCart(item)}>
                Add to Cart
              </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
