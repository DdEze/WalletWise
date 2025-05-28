import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/register.css'; 

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', { firstName, lastName, email, password });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('Usuario registrado y logueado correctamente!');
        navigate('/'); 
      } else {
        toast.success('Usuario registrado correctamente. Por favor inicia sesión.');
        navigate('/login');
      }

    } catch (error) {
      toast.error('Error al registrar usuario');
    }
  };

  return (
    <div className="register-container">
      <h1 className="project-title">WalletWise</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registrar Usuario</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
        <p>¿Ya tenés una cuenta? <Link to="/login">Volver al inicio de sesión</Link></p>
      </form>
    </div>
  );
}
