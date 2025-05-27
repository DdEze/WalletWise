import { useState } from 'react';
import api from '../services/api';

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
    <div>
      <h2>Perfil</h2>
      <form onSubmit={handleChange} style={{ marginBottom: 16 }}>
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

      <button 
        onClick={handleDelete} 
        style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', border: 'none', cursor: 'pointer' }}
      >
        Eliminar cuenta
      </button>
    </div>
  );
}
