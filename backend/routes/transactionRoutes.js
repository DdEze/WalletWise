const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createTransaction, getTransactions, deleteTransaction, getMonthlySummary, filterTransactions, updateTransaction, getBalance } = require('../controllers/transactionController');

router.post('/', auth, createTransaction);
router.get('/', auth, getTransactions);
router.delete('/:id', auth, deleteTransaction);
router.get('/summary/monthly', auth, getMonthlySummary);
router.get('/filter', auth, filterTransactions);
router.put('/:id', auth, updateTransaction);
router.get('/balance', auth, getBalance);

module.exports = router;
