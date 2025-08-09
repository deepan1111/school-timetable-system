const express = require('express');
const router = express.Router();
require('dotenv').config();
const { adminSignup, adminLogin } = require('../controllers/authController');

router.post('/admin-signup', adminSignup);
router.post('/admin/login', adminLogin);

module.exports = router;
