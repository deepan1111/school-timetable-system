// protectedRoutes.js
import express from "express";
import { verifyToken, adminOnly, teacherOnly } from "../middleware/authMiddleware.js";
import { 
  getSectionTimetable, 
  getSectionTeachers 
} from "../controllers/timetableController.js";

const router = express.Router();

// Dashboard routes
router.get("/admin/dashboard", verifyToken, adminOnly, (req, res) => {
  res.json({ 
    message: "Welcome to the admin dashboard", 
    user: req.user 
  });
});

router.get("/teacher/dashboard", verifyToken, teacherOnly, (req, res) => {
  res.json({ 
    message: "Welcome to the teacher dashboard", 
    user: req.user 
  });
});

// Timetable routes - using SQL database controllers
router.get("/timetable/:standard/:section", verifyToken, getSectionTimetable);
router.get("/timetable/:standard/:section/teachers", verifyToken, getSectionTeachers);

export default router;