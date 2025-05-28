import { useEffect, useState } from 'react';
import api from '../services/api';
import '../css/transactions.css'

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

  // Crear un mapa rápido de categorías por _id
  const categoriesMap = {};
  categories.forEach(c => {
    categoriesMap[c._id] = c;
  });

  // Mapear transacciones para agregar info completa de categoría
  const txWithCategory = transactions.map(tx => ({
    ...tx,
    category: categoriesMap[tx.category] || { name: 'Sin categoría', type: 'N/A' }
  }));

  return (
    <div className="transactions-container">
      <h2>Transacciones</h2>

      <form onSubmit={handleSubmit} className="transactions-form">
        <input type="number" placeholder="Monto" value={amount} onChange={e=>setAmount(e.target.value)} required />
        <select value={category} onChange={e=>setCategory(e.target.value)} required>
          <option value="">Categoría</option>
          {categories.map(c => (
            <option key={c._id} value={c._id}>{c.name} ({c.type})</option>
          ))}
        </select>
        <textarea placeholder="Descripción" value={description} onChange={e=>setDescription(e.target.value)} />
        <button type="submit">Agregar</button>
      </form>

      <div className="filters">
        <div className="filter-fields">
          <input type="date" onChange={e => setStartDate(e.target.value)} />
          <input type="date" onChange={e => setEndDate(e.target.value)} />
          <select onChange={e => setFilterType(e.target.value)}>
            <option value="">Todos los tipos</option>
            <option value="ingreso">Ingreso</option>
            <option value="gasto">Gasto</option>
          </select>
          <select onChange={e => setFilterCategory(e.target.value)}>
            <option value="">Todas las categorías</option>
            {categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-buttons">
          <button onClick={applyFilters}>Filtrar</button>
          <button onClick={refresh}>Limpiar</button>
        </div>
      </div>

      <ul className="transactions-list">
        {txWithCategory.map(tx => (
          <li key={tx._id}>
            <strong>{tx.category.name}</strong> (${tx.amount}) ‹{tx.category.type}› - {tx.description}
            <button onClick={() => handleEdit(tx)}>Editar</button>
            <button onClick={() => handleDelete(tx._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
