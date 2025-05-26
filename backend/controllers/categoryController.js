const Category = require('../models/Category');

// Crear categoría
const createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = new Category({
      user: req.user.id,
      name,
      type
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear categoría', error });
  }
};

// Obtener categorías del usuario
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error });
  }
};

// Eliminar categoría
const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar categoría', error });
  }
};

module.exports = { createCategory, getCategories, deleteCategory };
