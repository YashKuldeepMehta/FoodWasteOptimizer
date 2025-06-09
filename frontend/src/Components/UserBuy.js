import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserSidebar from './UserSidebar'
import "../css/userbuy.css"

const UserBuy = ()=>{
    const [saleproduct,setSaleProduct] = useState([]);
    const [uemail,setUemail] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        const localuemail = localStorage.getItem("uemail")
        setUemail(localuemail)

        if(!localuemail){
            navigate("/user-login")
        }
        else{
            fetch('http://localhost:5000/users/product-sale')
          .then((response) => response.json())
          .then((data) => setSaleProduct(data))
          .catch((error) => console.error('Error fetching products:', error));
        }
            
    },[])


    const HandleBuy = async (pid)=>{
        try{
            const response = await axios.post("http://localhost:5000/users/buy-product",{pid, uemail})
            if(response.data.message === "1"){
                alert("Product bought successfully")
                console.log(response.data.buy)
            }
            else{
                alert(response.data.message)
            }
        }
        catch(error){
            alert(error)
        }
    }
    return(
        <>
        <UserSidebar></UserSidebar>
        <div className="product-list">  
            <h2>Sale Products List</h2>
            <ul className="product-element">
              {saleproduct.map((product) => (
                <li key={product._id} className="product-item">               
                    <>
                      <h3>{product.name}</h3>
                      <p>Category: {product.category}</p>
                      <p>Price: Rs.{product.price.toFixed(2)}</p>
                      <p>Expiry Date: {new Date(product.expiry_date).toLocaleDateString()}</p>
                      <button type='button' className='sale-button' onClick={()=> HandleBuy(product._id)}>Buy</button>
                    </>
                </li>
              ))}
            </ul>
          </div>
    
        </>
    )
}

export default UserBuy