import express from "express";
import {
  getDashboardStats,
  getRecentActivity,
  getSystemStatus,
  getTeacherStats,
  getClassStats,
} from "../controllers/adminController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Dashboard Statistics
router.get("/admin/stats", authenticateToken, getDashboardStats);

// Recent Activity
router.get("/admin/activity", authenticateToken, getRecentActivity);

// System Status
router.get("/admin/system-status", authenticateToken, getSystemStatus);

// Teacher Statistics
router.get("/admin/teacher-stats", authenticateToken, getTeacherStats);

// Class Statistics
router.get("/admin/class-stats", authenticateToken, getClassStats);

export default router;