


const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  adminSignup,
  teacherSignup,
   commonLogin
} = require("../controllers/authController");

// Admin signup
router.post("/admin-signup", adminSignup);

// Teacher signup
router.post("/teacher-signup", teacherSignup);
router.post('/login', commonLogin);

module.exports = router;
