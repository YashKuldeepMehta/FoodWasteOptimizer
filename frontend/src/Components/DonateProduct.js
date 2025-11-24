
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/donateproduct.css";
import SideBar from "./SideBar"
function DonationFormPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        foodProductName: "",
        expiryDate: "",
    });

    const [oname, setOname] = useState("")
    useEffect(() => {
        const asyncfetch = async () => {

            const email = localStorage.getItem("oemail");
            try {
                if (!email) {
                    navigate("/organization-login")
                }
                else {
                    const response = await axios.post('http://localhost:5000/users/fetch-name', { email });
                    const user = response.data.user;
                    setOname(user.orgname)

                }
            }
            catch (err) {
                throw err
            }
        }
        asyncfetch()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submissionData = { ...formData, name: oname }; 
            const response = await axios.post('http://localhost:5000/users/donate-product', submissionData);
            if(response.data.message === "1"){ 
            alert("Donation Successful");
            setFormData({
                category: "",
                foodProductName: "",
                expiryDate: "",
            });
        }
            else{
                alert("Donation Failed")
                setFormData({
                    category: "",
                    foodProductName: "",
                    expiryDate: "",
                });
            }
        
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <SideBar/>
            <div className="donation-form">
                <h1>Donation Form</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={oname}
                            readOnly
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Food Product Name</label>
                        <input
                            type="text"
                            name="foodProductName"
                            value={formData.foodProductName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Expiry Date</label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Donate</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default DonationFormPage;