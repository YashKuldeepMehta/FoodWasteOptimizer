import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoutes';
import AdminDashboard from './pages/admin-dashboard';
import StatusUpdate from './pages/status-update'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<AdminDashboard />} /> 
          <Route path="/admin/status-update" element={<StatusUpdate/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
