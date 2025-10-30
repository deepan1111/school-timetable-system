// import express from "express";
// import {
//   getDashboardStats,
//   getRecentActivity,
//   getSystemStatus,
//   getTeacherStats,
//   getTeacherById,      // ADD
//   updateTeacherById  
// } from "../controllers/adminController.js";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Dashboard Statistics
// router.get("/admin/stats", verifyToken, adminOnly, getDashboardStats);

// // Recent Activity
// router.get("/admin/activity", verifyToken, adminOnly, getRecentActivity);

// // System Status
// router.get("/admin/system-status", verifyToken, adminOnly, getSystemStatus);

// // Teacher Statistics
// router.get("/admin/teacher-stats", verifyToken, adminOnly, getTeacherStats);
// router.get("/admin/teacher/:id", verifyToken, allowRoles("admin"), getTeacherById);
// router.put("/admin/teacher/:id", verifyToken, allowRoles("admin"), updateTeacherById);
// export default router;

import express from "express";
import {
  getDashboardStats,
  getRecentActivity,
  getSystemStatus,
  getTeacherStats,
  getTeacherById,
  updateTeacherById  
} from "../controllers/adminController.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard Statistics
router.get("/admin/stats", verifyToken, adminOnly, getDashboardStats);

// Recent Activity
router.get("/admin/activity", verifyToken, adminOnly, getRecentActivity);

// System Status
router.get("/admin/system-status", verifyToken, adminOnly, getSystemStatus);

// Teacher Statistics
router.get("/admin/teacher-stats", verifyToken, adminOnly, getTeacherStats);

// FIXED: Use adminOnly instead of allowRoles
router.get("/admin/teacher/:id", verifyToken, adminOnly, getTeacherById);
router.put("/admin/teacher/:id", verifyToken, adminOnly, updateTeacherById);

export default router;