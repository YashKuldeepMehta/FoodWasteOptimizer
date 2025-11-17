
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {useNavigate,Link}  from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Sidebar from '../Components/SideBar';
import '../css/admindashboard.css';


const AdminDashboard = () => {
    const [chartData, setChartData] = useState(null);
    const navigate = useNavigate();
    const [donationcount, setDonationcount] = useState(0);
    const [productcount, setProductcount] = useState(0);
    const [saleproductcount, setSaleproductcount] = useState(0);

    useEffect(() => {
        const adminemail = localStorage.getItem("aemail");
        if(!adminemail){
            navigate("/")
        }else{
            const asyncFunction = async () => {
                try{
                    const response = await axios.get('http://localhost:5000/users/fetch-stats');
                    setDonationcount(response.data.donationcount);
                    setProductcount(response.data.productcount);
                    setSaleproductcount(response.data.saleproductcount);
                    setChartData({
                        labels: ['Near Expiry Products', 'Normal Products'],
                        datasets: [
                          {
                            data: [response.data.saleproductcount, response.data.productcount - response.data.saleproductcount],
                            backgroundColor: ['#FF6384', '#36A2EB'],
                          },
                        ],
                      });
                    
                }catch(error){
                    console.log(error)
                }
            }
            asyncFunction();
        }       
    },[])

    return (
        <>
        <div className='admin-h1'>
            <h1>Admin Dashboard</h1>
        </div>
        <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Donations</h3>
          <div className='class-h1'>
              <h1 className='count-h1'>{donationcount}</h1>
          </div>
    
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className='class-h1'> 
              <h1 className='count-h1'>{productcount}</h1>
          </div>
        </div>
        <div className="stat-card">
          <h3>Sale Products</h3>
          <div className='class-h1'>
              <h1 className='count-h1'>{saleproductcount}</h1>
          </div>
        </div>
      </div>

      <div className='pie-chart-div'>
      <h2>Product Distribution</h2>
      {chartData ? <Pie data={chartData} className='pie-chart'/> : <p>Loading chart...</p>}
    </div>
        <Sidebar/>
      </>
    );
};

export default AdminDashboard;