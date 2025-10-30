import db from "../db/db.js";

// Get teacher profile with subject
export const getTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    const [rows] = await db.query(
      `SELECT t.teacher_id, t.name, t.email, t.phone, s.subject_name
       FROM teachers t
       LEFT JOIN subjects s ON t.subject_id = s.subject_id
       WHERE t.teacher_id = ?`,
      [teacherId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching teacher profile:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get teacher's assigned classes (NO STUDENTS TABLE)
export const getTeacherClasses = async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    const [rows] = await db.query(
      `SELECT 
        c.class_id,
        c.class_name,
        s.subject_name,
        c.current_enrolled as student_count,
        c.room_number,
        MIN(sch.start_time) as next_class_time
       FROM classes c
       LEFT JOIN subjects s ON c.subject_id = s.subject_id
       LEFT JOIN schedules sch ON c.class_id = sch.class_id
       WHERE c.teacher_id = ?
       GROUP BY c.class_id, c.class_name, s.subject_name, c.room_number, c.current_enrolled`,
      [teacherId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching teacher classes:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get today's schedule
export const getTodaySchedule = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const today = new Date().getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday

    const [rows] = await db.query(
      `SELECT 
        c.class_name,
        s.subject_name,
        sch.start_time,
        sch.end_time,
        sch.duration,
        c.room_number
       FROM schedules sch
       JOIN classes c ON sch.class_id = c.class_id
       LEFT JOIN subjects s ON c.subject_id = s.subject_id
       WHERE c.teacher_id = ? AND sch.day_of_week = ?
       ORDER BY sch.start_time`,
      [teacherId, today]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching schedule:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get dashboard statistics (NO STUDENTS TABLE)
export const getTeacherStats = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Total classes
    const [classCount] = await db.query(
      `SELECT COUNT(*) as total FROM classes WHERE teacher_id = ?`,
      [teacherId]
    );

    // Total students (sum from classes table)
    const [studentCount] = await db.query(
      `SELECT COALESCE(SUM(current_enrolled), 0) as total
       FROM classes
       WHERE teacher_id = ?`,
      [teacherId]
    );

    // This week's classes
    const [weekClasses] = await db.query(
      `SELECT COUNT(*) as total
       FROM schedules sch
       JOIN classes c ON sch.class_id = c.class_id
       WHERE c.teacher_id = ?`,
      [teacherId]
    );

    // Pending assignments
    const [pendingTasks] = await db.query(
      `SELECT COUNT(*) as total
       FROM assignments
       WHERE teacher_id = ? AND status = 'pending'`,
      [teacherId]
    );

    res.json({
      totalClasses: classCount[0].total || 0,
      totalStudents: studentCount[0].total || 0,
      weekClasses: weekClasses[0].total || 0,
      pendingTasks: pendingTasks[0].total || 0
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get recent activity
export const getRecentActivity = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const [rows] = await db.query(
      `SELECT 
        a.activity_type,
        a.activity_title,
        c.class_name,
        a.created_at
       FROM activities a
       LEFT JOIN classes c ON a.class_id = c.class_id
       WHERE a.teacher_id = ?
       ORDER BY a.created_at DESC
       LIMIT 10`,
      [teacherId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching activity:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// ADD these to your existing teacherDashboardControl.js

// Update teacher's own profile
export const updateTeacherProfile = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { name, phone, subject_id } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    await db.query(
      `UPDATE teachers SET name = ?, phone = ?, subject_id = ? WHERE teacher_id = ?`,
      [name, phone, subject_id, teacherId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};

// Get all subjects for dropdown
export const getAllSubjects = async (req, res) => {
  try {
    const [subjects] = await db.query(
      `SELECT subject_id, subject_name FROM subjects ORDER BY subject_name`
    );
    res.json(subjects);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ message: "Error fetching subjects", error: err.message });
  }
};

// ... existing functions ...

// Get teacher's complete weekly schedule
export const getTeacherWeeklySchedule = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const [schedule] = await db.query(
      `SELECT 
        sch.schedule_id,
        sch.day_of_week,
        sch.start_time,
        sch.end_time,
        sch.duration,
        c.class_name,
        c.room_number,
        s.subject_name
       FROM schedules sch
       JOIN classes c ON sch.class_id = c.class_id
       LEFT JOIN subjects s ON c.subject_id = s.subject_id
       WHERE c.teacher_id = ?
       ORDER BY sch.day_of_week, sch.start_time`,
      [teacherId]
    );

    res.json(schedule);
  } catch (err) {
    console.error("Error fetching teacher weekly schedule:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get teacher's upcoming/current class
export const getTeacherUpcomingClass = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const now = new Date();
    const currentDay = now.getDay(); // 0=Sunday, 1=Monday, etc.
    const currentTime = now.toTimeString().substring(0, 5); // HH:MM

    // Get today's remaining classes
    const [upcomingClasses] = await db.query(
      `SELECT 
        sch.schedule_id,
        sch.day_of_week,
        sch.start_time,
        sch.end_time,
        sch.duration,
        c.class_name,
        c.room_number,
        s.subject_name,
        CASE 
          WHEN sch.start_time <= ? AND sch.end_time > ? THEN 'current'
          WHEN sch.start_time > ? THEN 'upcoming'
          ELSE 'past'
        END as status
       FROM schedules sch
       JOIN classes c ON sch.class_id = c.class_id
       LEFT JOIN subjects s ON c.subject_id = s.subject_id
       WHERE c.teacher_id = ? 
       AND sch.day_of_week = ?
       AND sch.end_time > ?
       ORDER BY sch.start_time
       LIMIT 1`,
      [currentTime, currentTime, currentTime, teacherId, currentDay, currentTime]
    );

    if (upcomingClasses.length > 0) {
      res.json(upcomingClasses[0]);
    } else {
      // No more classes today, get first class tomorrow
      const [tomorrowClass] = await db.query(
        `SELECT 
          sch.schedule_id,
          sch.day_of_week,
          sch.start_time,
          sch.end_time,
          sch.duration,
          c.class_name,
          c.room_number,
          s.subject_name,
          'tomorrow' as status
         FROM schedules sch
         JOIN classes c ON sch.class_id = c.class_id
         LEFT JOIN subjects s ON c.subject_id = s.subject_id
         WHERE c.teacher_id = ? 
         AND sch.day_of_week = ?
         ORDER BY sch.start_time
         LIMIT 1`,
        [teacherId, currentDay === 6 ? 1 : currentDay + 1]
      );

      res.json(tomorrowClass[0] || null);
    }
  } catch (err) {
    console.error("Error fetching upcoming class:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};