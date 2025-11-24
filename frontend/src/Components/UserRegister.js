import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/UserRegister.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "customer";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shopName: "",
    restaurantName: "",
    ngoName: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = { ...formData, role };

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      setSuccess(`${formattedRole} registered successfully! Redirecting...`);

      setTimeout(() => {
        navigate(`/login?role=${role}`);
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.detail || "Registration failed. Try again."
      );
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="register-wrapper">
  <div className="register-card">

    <div className="register-left"></div>

    <div className="register-right">
      <div className="register-container">

        <h2 className="register-title">Register</h2>

        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <form className="register-form" onSubmit={handleSubmit}>

          {(role !== "admin") && (
            <>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
          )}

          {role === "shopkeeper" && (
            <>
              <label>Shop Name</label>
              <input
                type="text"
                name="shopName"
                placeholder="Enter shop name"
                value={formData.shopName}
                onChange={handleChange}
                required
              />
            </>
          )}

          {role === "customer" && (
            <>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>


        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate(`/login?role=${role}`)}>
            Login here
          </span><br></br>
          <span className="home-link" onClick={() => navigate("/")}>
            Go to home
          </span>

        </p>

      </div>
    </div>

  </div>
</div>

  );
}
