
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const UserRegistration = ()=> {
  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error,setError] = useState("");

  const handleChange = (e) => {
    setuserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:5000/users/user-register", userDetails);
        if(response.data.message === "1"){
            setError("User registered successfully");
            console.log(response.data.message)
            setuserDetails({name:"",email:"",password:""}); 
            setTimeout(()=>{
                setError("")  
              },2000)
            
        }
        else{
            setError(response.data.message);
            setuserDetails({name:"",email:"",password:""});
            setTimeout(()=>{
              setError("")  
            },2000)
        }
    }catch(error){
        setError(error.message);
    }
    console.log("User Details: ", userDetails);
  };
  return (
    <div className="organization-register">
      <h2>User Registration</h2>
      {error && <p className="msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">User Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
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
            value={userDetails.email}
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
            value={userDetails.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
        <Link to="/user-login">User Login</Link>
      </form>
    </div>
  );
}

export default UserRegistration;