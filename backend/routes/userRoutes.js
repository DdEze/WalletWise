const express = require('express');
const router = express.Router();
const { register, login, deleteUser, logout, changePassword } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.delete('/me', auth, deleteUser);
router.post('/logout', auth, logout);
router.put('/change-password', auth, changePassword);

module.exports = router;
