const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');

router.post('/', auth, createCategory);
router.get('/', auth, getCategories);
router.delete('/:id', auth, deleteCategory);

module.exports = router;
