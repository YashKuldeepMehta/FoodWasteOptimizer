import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        localStorage.removeItem("uemail");
        navigate("/user-login")
    })
}

export default UserLogout