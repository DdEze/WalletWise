import { useEffect, useState } from 'react';
import api from '../services/api';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [summary, setSummary] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Balance total
        const balRes = await api.get('/transactions/balance', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBalance(balRes.data.balance);

        // 2. Resumen mensual del mes actual
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // meses 1–12
        const sumRes = await api.get('/transactions/summary/monthly', {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, month }
        });
        setSummary(sumRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  if (balance === null || summary === null) {
    return <p>Cargando dashboard…</p>;
  }

  // Configuración de datos para Chart.js
  const data = {
    labels: [`${summary.month}/${summary.year}`],
    datasets: [
      {
        label: 'Ingresos',
        data: [summary.ingresos],
      },
      {
        label: 'Gastos',
        data: [summary.gastos],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p><strong>Balance total:</strong> ${balance}</p>

      <div style={{ maxWidth: 600, marginTop: 24 }}>
        <Bar data={data} 
             options={{
               responsive: true,
               plugins: {
                 legend: { position: 'top' },
                 title: { display: true, text: 'Resumen Mensual' }
               }
             }} />
      </div>
    </div>
  );
}
