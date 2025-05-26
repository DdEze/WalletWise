const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, acceso denegado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Token inválido o usuario eliminado' });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = auth;
