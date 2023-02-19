const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

// * GET => /login
router.get('/login', authController.getLogin);

module.exports = router;
