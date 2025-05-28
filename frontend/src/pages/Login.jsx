import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Sesión iniciada correctamente');
      navigate('/');
    } catch (error) {
      toast.error('Error al iniciar sesión. Verificá tus credenciales.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="project-title">WalletWise</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
        <p>¿No tenés cuenta? <Link to="/register">Registrate acá</Link></p>
      </form>
    </div>
  );
}
