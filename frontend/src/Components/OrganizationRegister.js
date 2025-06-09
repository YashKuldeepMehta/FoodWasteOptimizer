// OrganizationRegistration.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/organization-register.css";

const OrganizationRegistration = ()=> {
  const [organizationDetails, setOrganizationDetails] = useState({
    name: "",
    type: "",
    email: "",
    password: "",
  });
  const [error,setError] = useState("");

  const handleChange = (e) => {
    setOrganizationDetails({
      ...organizationDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:5000/users/org-register", organizationDetails);
        if(response.data.message === "1"){
            setError("Organization registered successfully");
            console.log(response.data.message)
            setOrganizationDetails({name:"",type:"",email:"",password:""}); 
            setTimeout(()=>{
                setError("")  
              },2000)
            
        }
        else{
            setError(response.data.message);
            setOrganizationDetails({name:"",type:"",email:"",password:""});
            setTimeout(()=>{
              setError("")  
            },2000)
        }
    }catch(error){
        setError(error.message);
    }
    console.log("Organization Details: ", organizationDetails);
  };

  return (
    <div className="organization-register">
      <h2>Organization Registration</h2>
      {error && <p className="msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Organization Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={organizationDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Organization Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={organizationDetails.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={organizationDetails.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={organizationDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
        <Link to="/organization-login">Organization Login</Link>
      </form>
    </div>
  );
}

export default OrganizationRegistration;