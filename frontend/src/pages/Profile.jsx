import { useState } from 'react';
import api from '../services/api';
import '../css/profile.css';

export default function Profile() {
  const [currentPassword, setCurrent] = useState('');
  const [newPassword, setNew] = useState('');

  const handleChange = async e => {
    e.preventDefault();
    try {
      await api.put('/users/change-password', { currentPassword, newPassword });
      alert('Contraseña actualizada');
      setCurrent('');
      setNew('');
    } catch {
      alert('Error al cambiar contraseña');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que querés eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      await api.delete('/users/me'); 
      alert('Cuenta eliminada correctamente');
      localStorage.removeItem('token'); 
      window.location.href = '/login';
    } catch {
      alert('Error al eliminar cuenta');
    }
  };

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      <form onSubmit={handleChange} className="profile-form">
        <input
          type="password"
          placeholder="Contraseña actual"
          value={currentPassword}
          onChange={e => setCurrent(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={e => setNew(e.target.value)}
          required
        />
        <button type="submit">Cambiar contraseña</button>
      </form>

      <button onClick={handleDelete} className="delete-account-btn">
        Eliminar cuenta
      </button>
    </div>
  );
}
