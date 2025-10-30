

// import express from "express";
// import {
//   getTeacherProfile,
//   getTeacherClasses,
//   getTodaySchedule,
//   getTeacherStats,
//   getRecentActivity,
//   updateTeacherProfile,  // ADD
//   getAllSubjects          // ADD
// } from "../controllers/teacherDashboardControl.js";
// import { verifyToken, teacherOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/teacher/profile", verifyToken, teacherOnly, getTeacherProfile);
// router.put("/teacher/profile", verifyToken, teacherOnly, updateTeacherProfile); // ADD
// router.get("/teacher/classes", verifyToken, teacherOnly, getTeacherClasses);
// router.get("/teacher/schedule/today", verifyToken, teacherOnly, getTodaySchedule);
// router.get("/teacher/stats", verifyToken, teacherOnly, getTeacherStats);
// router.get("/teacher/activity", verifyToken, teacherOnly, getRecentActivity);
// router.get("/subjects", verifyToken, getAllSubjects); // ADD

// export default router;

import express from "express";
import {
  getTeacherProfile,
  getTeacherClasses,
  getTodaySchedule,
  getTeacherStats,
  getRecentActivity,
  updateTeacherProfile,
  getAllSubjects,
  getTeacherWeeklySchedule,  // NEW
  getTeacherUpcomingClass    // NEW
} from "../controllers/teacherDashboardControl.js";
import { verifyToken, teacherOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Profile routes
router.get("/teacher/profile", verifyToken, teacherOnly, getTeacherProfile);
router.put("/teacher/profile", verifyToken, teacherOnly, updateTeacherProfile);

// Class routes
router.get("/teacher/classes", verifyToken, teacherOnly, getTeacherClasses);

// Schedule routes
router.get("/teacher/schedule/today", verifyToken, teacherOnly, getTodaySchedule);
router.get("/teacher/schedule/weekly", verifyToken, teacherOnly, getTeacherWeeklySchedule);  // NEW
router.get("/teacher/schedule/upcoming", verifyToken, teacherOnly, getTeacherUpcomingClass); // NEW

// Stats and activity
router.get("/teacher/stats", verifyToken, teacherOnly, getTeacherStats);
router.get("/teacher/activity", verifyToken, teacherOnly, getRecentActivity);

// Subjects
router.get("/subjects", verifyToken, getAllSubjects);

export default router;