const express = require('express');
const { registerUser, loginUser,getAllUsers } = require('../controller/UserController');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/', authMiddleware, getAllUsers);
router.get('/', getAllUsers);

module.exports = router;
