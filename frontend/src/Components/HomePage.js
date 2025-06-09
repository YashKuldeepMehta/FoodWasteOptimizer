// HomePage.js
import React from "react";
import "../css/homepage.css";

function HomePage() {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="hero-content">
          <h1>Stop Food Waste, Save Resources</h1>
          <p>
            Our platform empowers you to take control of your food inventory,
            connect with local charities, and discover incredible savings on
            near-expiry items. Join the movement and make a difference today!
          </p>
          <button className="cta-button">Get Started</button>{" "}
          {/* Call to action */}
        </div>
      </header>

      <section className="features">
        <h2>Explore Our Features</h2>
        <div className="feature-grid">
          <div className="feature feature-inventory">
            <h3>Manage Inventory</h3>
            <p>Track your food items, expiration dates, and quantities.</p>
          </div>
          <div className="feature feature-donate">
            <h3>Donate Surplus Food</h3>
            <p>Connect with local charities and donate excess food.</p>
          </div>
          <div className="feature feature-discounts">
            <h3>Explore Discounts</h3>
            <p>Find great deals on near-expiry food items.</p>
          </div>
        </div>
      </section>

      <section className="about-us">
        <h2>About Us</h2>
        <p>
          We are a team of passionate individuals dedicated to reducing food
          waste and promoting sustainability. Our mission is to connect
          businesses, charities, and individuals to create a more efficient and
          equitable food system.
        </p>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Food Waste Reduction System</p>
      </footer>
    </div>
  );
}

export default HomePage;