import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        localStorage.removeItem("aemail");
        navigate("/")
    })
}

export default Logout