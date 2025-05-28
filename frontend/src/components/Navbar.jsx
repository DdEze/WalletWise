import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import '../css/navbar.css'

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          id: decoded.id || decoded.userId,
          firstName: decoded.firstName || '',
          lastName: decoded.lastName || '',
        });
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Cerrar dropdown al click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transacciones</Link>
        <Link to="/categories">Categorías</Link>
      </div>

      {user ? (
        <div className="navbar-right" ref={dropdownRef}>
          <button
            className="user-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {user.firstName} {user.lastName} ▼
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" onClick={() => setDropdownOpen(false)}>Perfil</Link>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-right">
          <Link to="/login">Iniciar Sesión</Link>
        </div>
      )}
    </nav>
  );
}
