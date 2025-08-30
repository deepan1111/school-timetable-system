


import express from "express";
import { getAllTeachers } from "../controllers/teacherControl.js";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Only admins can access all teachers
router.get("/teachers", verifyToken, allowRoles("admin"), getAllTeachers);

export default router;
