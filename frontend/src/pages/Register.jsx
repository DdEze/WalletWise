import { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', { username, email, password });
      
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
    <form onSubmit={handleSubmit}>
      <h2>Registrar Usuario</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
  );
}
