import express from "express";
import {
  adminSignup,
  teacherSignup,
  commonLogin,
} from "../controllers/authController.js";

const router = express.Router();

// Admin signup
router.post("/admin-signup", adminSignup);

// Teacher signup
router.post("/teacher-signup", teacherSignup);

// Common login
router.post("/login", commonLogin);

export default router;