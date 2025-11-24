import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";

export default function HomePage() {
  const navigate = useNavigate();

  const goToLogin = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="home-wrapper">

      <section className="hero">
        <div className="hero-content">
          <h1>Food Waste Optimizer</h1>
          <p>
            A smart platform connecting <b>Shopkeepers</b>, <b>Customers</b>, <b>Restaurants</b>, 
            <b> NGOs</b> to reduce food waste.
          </p>

          <div className="role-buttons">
            <button onClick={() => goToLogin("customer")}>Customer Login</button>
            <button onClick={() => goToLogin("shopkeeper")}>Shopkeeper Login</button>
            <button onClick={() => goToLogin("restaurant")}>Restaurant Login</button>
            <button onClick={() => goToLogin("ngo")}>NGO Login</button>
            <button onClick={() => goToLogin("admin")}>Admin Login</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
            alt="Food Waste"
          />
        </div>
      </section>

      <section className="steps">
        <h2>How It Works</h2>

        <div className="steps-container">
          <div className="step-card">
            <h3>1. Shopkeepers Upload Inventory</h3>
            <p>
              Shopkeepers add all food items they have. The system auto-checks expiry every day.
            </p>
          </div>

          <div className="step-card">
            <h3>2. System Applies Discounts</h3>
            <p>
              If any item is ≤ 7 days from expiry, it's added to the discounted marketplace.
            </p>
          </div>

          <div className="step-card">
            <h3>3. Customers Buy Discounted Items</h3>
            <p>Customers view, select, and buy discounted items before they expire.</p>
          </div>

          <div className="step-card">
            <h3>4. Restaurants Upload Food Donations</h3>
            <p>Leftover food can be donated by restaurants for NGOs to claim.</p>
          </div>

          <div className="step-card">
            <h3>5. NGOs Claim Donations</h3>
            <p>
              NGOs can claim and pick up food donations before they expire or auto-delete.
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Platform Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Expiry Tracking</h3>
            <p>Automatic expiry scanning and discount application for shopkeepers.</p>
          </div>

          <div className="feature-card">
            <h3>Donation System</h3>
            <p>Restaurants donate leftover food safely. NGOs claim instantly.</p>
          </div>

          <div className="feature-card">
            <h3>Affordable Food Marketplace</h3>
            <p>Customers get quality food at a lower price before expiry.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Food Waste Optimizer — Reduce Waste, Serve Lives.</p>
      </footer>

    </div>
  );
}
