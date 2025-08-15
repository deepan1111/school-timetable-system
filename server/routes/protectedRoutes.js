const express = require('express');
require('dotenv').config();
const router = express.Router();
const { verifyToken, adminOnly ,teacherOnly  } = require('../middleware/authMiddleware');

router.get('/admin/dashboard', verifyToken, adminOnly, (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard', user: req.user });
});

router.get('/teacher/dashboard', verifyToken, teacherOnly, (req, res) => {
  res.json({ message: 'Welcome to the teacher dashboard', user: req.user });
});

module.exports = router;
