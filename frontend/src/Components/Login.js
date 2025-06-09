import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/Login.css';


import { useNavigate, Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const adminemail = localStorage.getItem("aemail");
        if (adminemail) {
            navigate("/admin-dashboard")
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        try {

            const response = await axios.post('http://localhost:5000/users/login', { email, password });
            console.log(response.data.message);
            if (response.data.message === "1") {
                const admin = response.data.admin;
                localStorage.setItem("aemail", admin.email);
                console.log("Admin logged in successfully");
                setEmail('');
                setPassword('');
                setError('');
                navigate('/admin-dashboard');
            }
            else {
                setEmail('');
                setPassword('');
                setError(response.data.message);
                setTimeout(() => {
                    setError("")
                }, 2000)

            }

        } catch (error) {
            setError(error)
        }
    };

    return (
        <div className="login-containers">
            <h2>Admin Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="login-forms">
                <div className="input-groups">
                    <div className='login-labels'>
                        <label>Email:</label>
                    </div>
                    <div className='login-inputs'>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="input-groups">
                    <div className='login-labels'>
                        <label>Password:</label>
                    </div>
                    <div className='login-inputs'>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="login-button" >Login</button>
                <div className="login-links">
                    <Link to="/organization-login">Organization Login</Link>
                    <Link to="/user-login">User Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;