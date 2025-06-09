import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/OrganizationLogin.css';
import {useNavigate,Link}  from 'react-router-dom';


const OrgLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const orgemail = localStorage.getItem("oemail");
        if(orgemail){
            navigate("/org-dashboard")
        }
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        try{
      
        const response = await axios.post('http://localhost:5000/users/org-login', { email, password });
        console.log(response.data.message);
        if(response.data.message === "1"){
            const org = response.data.org;
            localStorage.setItem("oemail",org.email);
            localStorage.setItem("oname",org.orgname);
            console.log("Organization logged in successfully");
            setEmail('');
            setPassword('');
            setError('');
            navigate('/org-dashboard');
        }
        else{
            setEmail('');
            setPassword('');
            setError(response.data.message);
            setTimeout(()=>{
              setError("")  
            },2000)

        }
        
        }catch(error){
            setError(error)
        }
    };

    return (
        <div className="login-containers">
            <h2>Organization Login</h2>
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
                <Link to="/">Admin Login</Link>
                <Link to="/org-register">Organization Register</Link>
                </div>
            </form>
        </div>
    );
};

export default OrgLogin;