import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../css/home.css'


const Home = ()=>{
    const navigate = useNavigate()

    return(
        <>
        <nav className="navbar">
            <div className="logo">
                <h1>Food Waste Optimizer</h1>
            </div>
            <ul className="nav-links">
                <Link to="/"><li>Home</li></Link>
                <Link to="/user-login"><li>User Login</li></Link>
                <Link to="/admin-login"><li>Admin Login</li></Link>
                <Link to="/organization-login"><li>Organization Login</li></Link>
            </ul>
        </nav>
        </>
    )
}

export default Home