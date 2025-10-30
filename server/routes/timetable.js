// // backend/routes/timetable.js
// // REPLACE YOUR ENTIRE FILE WITH THIS

// import express from "express";
// import {
//   getSectionTimetable,
//   getSectionTeachers,
//   getAvailableTeachers,
//   assignTeacherToClass,
//   createSchedule,
//   updateSchedule,
//   deleteSchedule,
//   getAllSubjects
// } from "../controllers/timetableController.js";
// import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Test route FIRST to verify routes are loaded
// router.get("/test", (req, res) => {
//   console.log("✅ Timetable test route hit!");
//   res.json({ message: "Timetable routes are working!" });
// });

// // Get timetable for a specific section
// // URL: GET /api/timetable/10th/A
// router.get("/:standard/:section", verifyToken, getSectionTimetable);

// // Get teachers for a section  
// // URL: GET /api/timetable/10th/A/teachers
// router.get("/:standard/:section/teachers", verifyToken, getSectionTeachers);

// // Admin routes
// router.get("/teachers/available", verifyToken, adminOnly, getAvailableTeachers);
// router.get("/subjects", verifyToken, getAllSubjects);
// router.post("/classes/assign", verifyToken, adminOnly, assignTeacherToClass);
// router.post("/schedules", verifyToken, adminOnly, createSchedule);
// router.put("/schedules/:schedule_id", verifyToken, adminOnly, updateSchedule);
// router.delete("/schedules/:schedule_id", verifyToken, adminOnly, deleteSchedule);

// console.log("✅ Timetable routes loaded");

// export default router;

import express from "express";
import {
  getSectionTimetable,
  getSectionTeachers,
  getAvailableTeachers,
  assignTeacherToClass,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getAllSubjects
} from "../controllers/timetableController.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("🔧 Loading timetable routes...");

// Test route
router.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Timetable routes working!" });
});

// Get timetable for section
router.get("/:standard/:section", verifyToken, getSectionTimetable);

// Get teachers for section
router.get("/:standard/:section/teachers", verifyToken, getSectionTeachers);

// Admin routes
router.get("/teachers/available", verifyToken, adminOnly, getAvailableTeachers);
router.get("/subjects", verifyToken, getAllSubjects);
router.post("/classes/assign", verifyToken, adminOnly, assignTeacherToClass);
router.post("/schedules", verifyToken, adminOnly, createSchedule);
router.put("/schedules/:schedule_id", verifyToken, adminOnly, updateSchedule);
router.delete("/schedules/:schedule_id", verifyToken, adminOnly, deleteSchedule);

console.log("✅ Timetable routes loaded successfully");

export default router;