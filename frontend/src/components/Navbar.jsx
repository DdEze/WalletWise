import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> | 
      <Link to="/transactions">Transacciones</Link> | 
      <Link to="/categories">Categorías</Link> | 
      <Link to="/profile">Perfil</Link> | 
      <Link to="/login">Cerrar Sesión</Link>
    </nav>
  );
}
