const express = require('express');
require('dotenv').config();
const router = express.Router();
const { verifyToken, adminOnly } = require('../middleware/authMiddleware');

router.get('/admin/dashboard', verifyToken, adminOnly, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard', user: req.user });
});

module.exports = router;
