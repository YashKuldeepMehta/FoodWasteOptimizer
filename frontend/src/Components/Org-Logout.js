import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrgLogout = () => {
    const navigate = useNavigate()

    useEffect(()=>{
        localStorage.removeItem("oemail");
        localStorage.removeItem("oname");
        navigate("/organization-login")
    })
}

export default OrgLogout