import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories]     = useState([]);
  const [loading, setLoading]           = useState(true);

  const [amount, setAmount]       = useState('');
  const [category, setCategory]   = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [filterType, setFilterType]       = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      const [txRes, catRes] = await Promise.all([
        api.get('/transactions'),
        api.get('/categories')
      ]);
      setTransactions(txRes.data);
      setCategories(catRes.data);
      setLoading(false);
    };
    loadAll();
  }, []);

  const refresh = async () => {
    const res = await api.get('/transactions');
    setTransactions(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/transactions', { amount: parseFloat(amount), category, description });
    setAmount(''); setCategory(''); setDescription('');
    refresh();
  };

  const handleDelete = async id => {
    if (!window.confirm('Eliminar transacción?')) return;
    await api.delete(`/transactions/${id}`);
    refresh();
  };

  const handleEdit = async tx => {
    const newAmt = prompt('Nuevo monto', tx.amount);
    if (newAmt == null) return;
    await api.put(`/transactions/${tx._id}`, { amount: Number(newAmt) });
    refresh();
  };

  const applyFilters = async () => {
    const params = {};
    if (startDate && endDate) { params.startDate = startDate; params.endDate = endDate; }
    if (filterType)   params.type     = filterType;
    if (filterCategory) params.category = filterCategory;
    const res = await api.get('/transactions/filter', { params });
    setTransactions(res.data);
  };

  if (loading) return <p>Cargando transacciones…</p>;

  return (
    <div>
      <h2>Transacciones</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input type="number" placeholder="Monto" value={amount} onChange={e=>setAmount(e.target.value)} required />
        <select value={category} onChange={e=>setCategory(e.target.value)} required>
          <option value="">Categoría</option>
          {categories.map(c=>(
            <option key={c._id} value={c._id}>{c.name} ({c.type})</option>
          ))}
        </select>
        <input placeholder="Descripción" value={description} onChange={e=>setDescription(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>

      {/* Filtros */}
      <div style={{ marginBottom: 16 }}>
        <input type="date"   onChange={e=>setStartDate(e.target.value)} />
        <input type="date"   onChange={e=>setEndDate(e.target.value)}   />
        <select onChange={e=>setFilterType(e.target.value)}>
          <option value="">Todos los tipos</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <select onChange={e=>setFilterCategory(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map(c=>(
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <button onClick={applyFilters}>Filtrar</button>
        <button onClick={refresh} style={{ marginLeft: 8 }}>Limpiar</button>
      </div>

      {/* Lista */}
      <ul>
        {transactions.map(tx => (
          <li key={tx._id} style={{ marginBottom: 8 }}>
            <strong>{tx.category.name}</strong> (${tx.amount}) ‹{tx.category.type}› — {tx.description}
            <button onClick={()=>handleEdit(tx)} style={{ marginLeft: 8 }}>Editar</button>
            <button onClick={()=>handleDelete(tx._id)} style={{ marginLeft: 8, color: 'red' }}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
