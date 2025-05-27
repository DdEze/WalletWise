import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName]             = useState('');
  const [type, setType]             = useState('gasto');
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await api.get('/categories');
      setCategories(res.data);
      setLoading(false);
    };
    load();
  }, []);

  const refresh = async () => {
    const res = await api.get('/categories');
    setCategories(res.data);
  };

  const handleCreate = async e => {
    e.preventDefault();
    await api.post('/categories', { name, type });
    setName(''); setType('gasto');
    refresh();
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    await api.delete(`/categories/${id}`);
    refresh();
  };

  if (loading) return <p>Cargando categorías…</p>;

  return (
    <div>
      <h2>Categorías</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: 16 }}>
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} required />
        <select value={type} onChange={e=>setType(e.target.value)}>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <button type="submit">Crear</button>
      </form>
      <ul>
        {categories.map(c=>(
          <li key={c._id} style={{ marginBottom: 8 }}>
            <strong>{c.name}</strong> ({c.type})
            <button onClick={()=>handleDelete(c._id)} style={{ marginLeft: 8, color: 'red' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
