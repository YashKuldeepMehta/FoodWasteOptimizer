import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../css/UserLogin.css"

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "customer";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          role,
        }
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(`/${role}/dashboard`);
    }
    catch (err) {
      setError(
        err.response?.data?.detail || "Invalid credentials. Try again."
      );
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left"></div>

        <div className="login-right">
          <div className="login-container">

            <h2 className="login-title">{formattedRole} Login</h2>

            {error && <div className="error-box">{error}</div>}

            <form className="login-form" onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-btn">Login</button>
            </form>

            <p className="register-text">
              New {role}?{" "}
              <span className="register-link"
                onClick={() => navigate(`/register?role=${role}`)}>
                Register here
              </span><br></br>
              <span className="home-link"
                onClick={() => navigate("/")}>
              Go to home
              </span>
            </p>

          </div>
        </div>

      </div>
    </div>

  );
}
