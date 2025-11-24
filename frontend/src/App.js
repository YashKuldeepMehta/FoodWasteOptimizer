import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoutes';

import UserLogin from '../src/Components/UserLogin';
import UserRegister from './Components/UserRegister';
import Logout from "./Components/Logout";
import Home from './Components/home';

import AdminDashboard from './Components/admin-dashboard';

import CustomerDashboard from './Components/CustomerDashboard';
import CustomerMarketPlace from "./Components/CustomerMarketPlace";
import CustomerCart from './Components/CustomerCart'
import CustomerCheckout from './Components/CustomerCheckout'
import CustomerPurchaseHistory from './Components/CustomerPurchaseHistory'

import ShopkeeperDashboard from './Components/ShopKeeperDashboard';
import ShopKeeperAddInventory from "./Components/ShopKeeperAddInventory";
import ShopKeeperInventory from "./Components/ShopKeeperInventory";

import DonationFormPage from './Components/DonateProduct';



function App() {
  return (
    
    <div className='App'>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path="/register" element={<UserRegister/>}/>
        <Route path="/logout" element={<Logout/>}/>
        
        <Route path="/customer/dashboard" element={<ProtectedRoute allowedRole="customer"><CustomerDashboard/></ProtectedRoute>}/>
        <Route path="/customer/marketplace" element={<ProtectedRoute allowedRole="customer"><CustomerMarketPlace/></ProtectedRoute>}></Route>
        <Route path="/customer/cart" element={<ProtectedRoute allowedRole="customer"><CustomerCart/></ProtectedRoute>}></Route>
        <Route path="/customer/checkout" element={<ProtectedRoute allowedRole="customer"><CustomerCheckout/></ProtectedRoute>}></Route>
        <Route path="/customer/history" element={<ProtectedRoute allowedRole="customer"><CustomerPurchaseHistory/></ProtectedRoute>}></Route>

        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>

        <Route path="/shopkeeper/dashboard" element={<ProtectedRoute allowedRole="shopkeeper"><ShopkeeperDashboard/></ProtectedRoute>}/>    
        <Route path="/shopkeeper/view-products" element={<ProtectedRoute allowedRole="shopkeeper"><ShopKeeperInventory/></ProtectedRoute>}></Route>
        <Route path="/shopkeeper/add-product" element={<ProtectedRoute allowedRole="shopkeeper"><ShopKeeperAddInventory/></ProtectedRoute>}/>
          
          <Route path="/donate-products" element={<DonationFormPage/>}></Route>
          

        </Routes>
      </Router>
    </div>    
  );
}

export default App;
