const express = require('express');
const router = express.Router();
const { register, login, deleteUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.delete('/me', auth, deleteUser);

module.exports = router;
