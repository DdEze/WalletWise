const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'El email ya está registrado' });

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });


    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    await Transaction.deleteMany({ user: userId });

    await Category.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);

    res.json({ message: 'Usuario y datos relacionados eliminados correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};

module.exports = { register, login, deleteUser };
