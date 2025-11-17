import './App.css';
import Login from '../src/Components/Login';
import AdminDashboard from './Components/admin-dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logout from './Components/Logout';
import AddProduct from './Components/AddProducts';
import ProductList from './Components/ViewProducts';
import ProductsForSale from './Components/ProductsForSale';
import OrgLogin from './Components/OrganizationLogin';
import OrganizationRegistration from './Components/OrganizationRegister';
import OrgLogout from './Components/Org-Logout';
import {OrgDashboard} from './Components/org-dashboard';
import DonationFormPage from './Components/DonateProduct';
import UserLogin from './Components/UserLogin';
import UserRegistration from './Components/UserRegister';
import UserDashboard from './Components/user-dashboard';
import UserLogout from './Components/UserLogout';
import UserBuy from './Components/UserBuy';
import Home from './Components/home';

function App() {
  return (
    
    <div className='App'>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin-login' element={<Login/>}/>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='org-logout' element={<OrgLogout/>}/>
          <Route path="/user-logout" element={<UserLogout/>}/>
          <Route path="/donate-products" element={<DonationFormPage/>}></Route>
          <Route path='/add-products' element={<AddProduct/>}></Route>
          <Route path="/view-products" element={<ProductList/>}></Route>
          <Route path="/sale-products" element={<ProductsForSale/>}></Route>
          <Route path="/organization-login" element={<OrgLogin/>}></Route>
          <Route path='/org-register' element={<OrganizationRegistration/>}></Route>
          <Route path='/org-dashboard' element={<OrgDashboard/>}></Route>
          <Route path="/user-login" element={<UserLogin/>}></Route>
          <Route path='/user-register' element={<UserRegistration/>}></Route>
          <Route path='/user-dashboard' element={<UserDashboard/>}></Route>
          <Route path='/user-buy' element={<UserBuy/>}></Route>

        </Routes>
      </Router>
    </div>    
  );
}

export default App;
