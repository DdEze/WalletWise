const Transaction = require('../models/Transaction');

// Crear nueva transacción
const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;
    const transaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      category,
      description,
      date
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la transacción', error });
  }
};

// Obtener transacciones del usuario
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transacciones', error });
  }
};

// Eliminar transacción
const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.status(200).json({ message: 'Transacción eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar transacción', error });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { year, month } = req.query; // ejemplo: ?year=2025&month=5

    const start = new Date(year, month - 1, 1); // primer día del mes
    const end = new Date(year, month, 1); // primer día del mes siguiente

    const transacciones = await Transaction.find({
      user: userId,
      date: { $gte: start, $lt: end }
    });

    let ingresos = 0;
    let gastos = 0;

    transacciones.forEach(t => {
      if (t.type === 'ingreso') ingresos += t.amount;
      else if (t.type === 'gasto') gastos += t.amount;
    });

    res.status(200).json({
      month,
      year,
      ingresos,
      gastos,
      balance: ingresos - gastos
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al calcular resumen mensual', error });
  }
};

module.exports = { createTransaction, getTransactions, deleteTransaction, getMonthlySummary };
