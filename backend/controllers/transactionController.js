const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const mongoose = require('mongoose');

const createTransaction = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const transaction = new Transaction({
      user: req.user.id,
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

const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }

    if (transaction.user.toString() !== userId) {
      return res.status(403).json({ message: 'No autorizado para editar esta transacción' });
    }

    const { description, amount, date, category } = req.body;

    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: 'ID de categoría inválido' });
    }

    if (description !== undefined) transaction.description = description;
    if (amount !== undefined) transaction.amount = amount;
    if (date !== undefined) transaction.date = date;
    if (category !== undefined) transaction.category = category;

    await transaction.save();

    res.status(200).json({ message: 'Transacción actualizada', transaction });

  } catch (error) {
    console.error('Error al actualizar la transacción:', error);
    res.status(500).json({ message: 'Error al actualizar la transacción', error: error.message });
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
    const { year, month } = req.query;

    // Definir rango de fechas
    const start = new Date(year, month - 1, 1);
    const end   = new Date(year, month, 1);

    // Traer transacciones del mes con la categoría poblada
    const transacciones = await Transaction
      .find({
        user: userId,
        date: { $gte: start, $lt: end }
      })
      .populate('category', 'type');

    let ingresos = 0;
    let gastos   = 0;

    // Sumar/restar según el tipo de la categoría
    transacciones.forEach(tx => {
      if (tx.category.type === 'ingreso') ingresos += tx.amount;
      else if (tx.category.type === 'gasto')   gastos   += tx.amount;
    });

    res.status(200).json({
      month,
      year,
      ingresos,
      gastos,
      balance: ingresos - gastos
    });
  } catch (error) {
    console.error('Error al calcular resumen mensual:', error);
    res.status(500).json({
      message: 'Error al calcular resumen mensual',
      error: error.message
    });
  }
};

const filterTransactions = async (req, res) => {
  try {
    const userId   = req.user.id;
    const { startDate, endDate, type, category } = req.query;
    const query    = { user: userId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (category) {
      query.category = category; 
    }
    else if (type) {
      const cats = await Category.find({ user: userId, type }).select('_id');
      const catIds = cats.map(c => c._id);
      query.category = { $in: catIds };
    }

    const transacciones = await Transaction
      .find(query)
      .populate('category', 'name type');

    res.status(200).json(transacciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al filtrar transacciones', error: error.message });
  }
};

const getBalance = async (req, res) => {
  try {
    const transactions = await Transaction
      .find({ user: req.user.id })
      .populate('category', 'type');

    const balance = transactions.reduce((acc, tx) => {
      return tx.category.type === 'ingreso'
        ? acc + tx.amount
        : acc - tx.amount;
    }, 0);

    res.status(200).json({ balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al calcular el balance', error: error.message });
  }
};

module.exports = { createTransaction, getTransactions, deleteTransaction, updateTransaction, getMonthlySummary, filterTransactions, getBalance };
