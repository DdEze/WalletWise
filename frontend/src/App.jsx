import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Register from './pages/Register';
import './App.css';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Layout><Dashboard /></Layout></RequireAuth>} />
        <Route path="/transactions" element={<RequireAuth><Layout><Transactions /></Layout></RequireAuth>} />
        <Route path="/categories" element={<RequireAuth><Layout><Categories /></Layout></RequireAuth>}/>
        <Route path="/profile" element={<RequireAuth><Layout><Profile /></Layout></RequireAuth>}/>
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
