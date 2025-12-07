

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

// console.log("🔧 Loading timetable routes...");

// // Test route
// router.get("/test", (req, res) => {
//   console.log("✅ Test route hit!");
//   res.json({ message: "Timetable routes working!" });
// });

// // Get timetable for section
// router.get("/:standard/:section", verifyToken, getSectionTimetable);

// // Get teachers for section
// router.get("/:standard/:section/teachers", verifyToken, getSectionTeachers);

// // Admin routes
// router.get("/teachers/available", verifyToken, adminOnly, getAvailableTeachers);
// router.get("/subjects", verifyToken, getAllSubjects);
// router.post("/classes/assign", verifyToken, adminOnly, assignTeacherToClass);
// router.post("/schedules", verifyToken, adminOnly, createSchedule);
// router.put("/schedules/:schedule_id", verifyToken, adminOnly, updateSchedule);
// router.delete("/schedules/:schedule_id", verifyToken, adminOnly, deleteSchedule);

// console.log("✅ Timetable routes loaded successfully");

// export default router;

// backend/routes/timetable.js - ADD THESE LINES
// backend/routes/timetable.js - COMPLETE FILE

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

// ✅ ADD THIS IMPORT
import {
  bulkCreateTimetable,
  getAvailableTeachersForBulk
} from "../controllers/bulkTimetableController.js";

import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("🔧 Loading timetable routes...");

// Test route
router.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ message: "Timetable routes working!" });
});

// ✅ BULK CREATION ROUTES - MUST BE BEFORE /:standard/:section
router.post("/bulk-create", verifyToken, adminOnly, bulkCreateTimetable);
router.get("/teachers-grouped", verifyToken, adminOnly, getAvailableTeachersForBulk);

// Admin routes - BEFORE dynamic params
router.get("/teachers/available", verifyToken, adminOnly, getAvailableTeachers);
router.get("/subjects", verifyToken, getAllSubjects);
router.post("/classes/assign", verifyToken, adminOnly, assignTeacherToClass);
router.post("/schedules", verifyToken, adminOnly, createSchedule);
router.put("/schedules/:schedule_id", verifyToken, adminOnly, updateSchedule);
router.delete("/schedules/:schedule_id", verifyToken, adminOnly, deleteSchedule);

// Dynamic routes - MUST BE LAST (otherwise they catch everything)
router.get("/:standard/:section", verifyToken, getSectionTimetable);
router.get("/:standard/:section/teachers", verifyToken, getSectionTeachers);

console.log("✅ Timetable routes loaded successfully");

export default router;