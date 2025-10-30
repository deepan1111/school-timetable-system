// import db from "../db/db.js";

// // Get timetable for a specific section (e.g., 10A)
// export const getSectionTimetable = async (req, res) => {
//   try {
//     const { standard, section } = req.params; // e.g., "10th", "A"
//     const className = `${standard} ${section}`.toUpperCase(); // "10TH A"

//     const [timetable] = await db.query(
//       `SELECT 
//         sch.schedule_id,
//         sch.day_of_week,
//         sch.start_time,
//         sch.end_time,
//         sch.duration,
//         c.class_name,
//         c.room_number,
//         s.subject_name,
//         t.name as teacher_name,
//         t.teacher_id
//        FROM schedules sch
//        JOIN classes c ON sch.class_id = c.class_id
//        LEFT JOIN subjects s ON c.subject_id = s.subject_id
//        LEFT JOIN teachers t ON c.teacher_id = t.teacher_id
//        WHERE c.class_name = ?
//        ORDER BY sch.day_of_week, sch.start_time`,
//       [className]
//     );

//     if (timetable.length === 0) {
//       return res.status(404).json({ 
//         message: "No timetable found for this section",
//         className 
//       });
//     }

//     res.json(timetable);
//   } catch (err) {
//     console.error("Error fetching section timetable:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

// // Get teachers handling a specific section
// export const getSectionTeachers = async (req, res) => {
//   try {
//     const { standard, section } = req.params;
//     const className = `${standard} ${section}`.toUpperCase();

//     const [teachers] = await db.query(
//       `SELECT DISTINCT
//         t.teacher_id,
//         t.name,
//         t.email,
//         t.phone,
//         s.subject_name
//        FROM teachers t
//        JOIN classes c ON t.teacher_id = c.teacher_id
//        LEFT JOIN subjects s ON t.subject_id = s.subject_id
//        WHERE c.class_name = ?`,
//       [className]
//     );

//     res.json(teachers);
//   } catch (err) {
//     console.error("Error fetching section teachers:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

// // Get all available teachers with their subjects
// export const getAvailableTeachers = async (req, res) => {
//   try {
//     const [teachers] = await db.query(
//       `SELECT 
//         t.teacher_id,
//         t.name,
//         t.email,
//         s.subject_name,
//         s.subject_id
//        FROM teachers t
//        LEFT JOIN subjects s ON t.subject_id = s.subject_id
//        ORDER BY t.name`
//     );

//     res.json(teachers);
//   } catch (err) {
//     console.error("Error fetching teachers:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

// // Assign teacher to a class (create new class entry)
// export const assignTeacherToClass = async (req, res) => {
//   try {
//     const { class_name, teacher_id, subject_id, room_number, student_capacity } = req.body;

//     if (!class_name || !teacher_id) {
//       return res.status(400).json({ message: "Class name and teacher are required" });
//     }

//     // Check if class already exists with this teacher and subject
//     const [existing] = await db.query(
//       `SELECT * FROM classes WHERE class_name = ? AND teacher_id = ? AND subject_id = ?`,
//       [class_name, teacher_id, subject_id]
//     );

//     if (existing.length > 0) {
//       return res.status(409).json({ 
//         message: "This teacher is already assigned to this class for this subject" 
//       });
//     }

//     const [result] = await db.query(
//       `INSERT INTO classes (class_name, teacher_id, subject_id, room_number, student_capacity)
//        VALUES (?, ?, ?, ?, ?)`,
//       [class_name, teacher_id, subject_id, room_number || null, student_capacity || 40]
//     );

//     res.status(201).json({ 
//       message: "Teacher assigned successfully",
//       class_id: result.insertId 
//     });
//   } catch (err) {
//     console.error("Error assigning teacher:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

// // Create schedule entry for a class
// export const createSchedule = async (req, res) => {
//   try {
//     const { class_id, day_of_week, start_time, end_time, duration } = req.body;

//     if (!class_id || day_of_week === undefined || !start_time || !end_time) {
//       return res.status(400).json({ message: "All schedule fields are required" });
//     }

//     // Check for time conflicts
//     const [conflicts] = await db.query(
//       `SELECT * FROM schedules sch
//        JOIN classes c ON sch.class_id = c.class_id
//        WHERE c.teacher_id = (SELECT teacher_id FROM classes WHERE class_id = ?)
//        AND sch.day_of_week = ?
//        AND (
//          (sch.start_time <= ? AND sch.end_time > ?) OR
//          (sch.start_time < ? AND sch.end_time >= ?) OR
//          (sch.start_time >= ? AND sch.end_time <= ?)
//        )`,
//       [class_id, day_of_week, start_time, start_time, end_time, end_time, start_time, end_time]
//     );

//     if (conflicts.length > 0) {
//       return res.status(409).json({ 
//         message: "Schedule conflict: Teacher already has a class at this time",
//         conflicts 
//       });
//     }

//     const [result] = await db.query(
//       `INSERT INTO schedules (class_id, day_of_week, start_time, end_time, duration)
//        VALUES (?, ?, ?, ?, ?)`,
//       [class_id, day_of_week, start_time, end_time, duration || 45]
//     );

//     res.status(201).json({ 
//       message: "Schedule created successfully",
//       schedule_id: result.insertId 
//     });
//   } catch (err) {
//     console.error("Error creating schedule:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

// // Update schedule
// export const updateSchedule = async (req, res) => {
//   try {
//     const { schedule_id } = req.params;
//     const { day_of_week, start_time, end_time, duration } = req.body;

//     const [result] = await db.query(
//       `UPDATE schedules 
//        SET day_of_week = ?, start_time = ?, end_time = ?, duration = ?
//        WHERE schedule_id = ?`,
//       [day_of_week, start_time, end_time, duration, schedule_id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Schedule not found" });
//     }

//     res.json({ message: "Schedule updated successfully" });
//   } catch (err) {
//     console.error("Error updating schedule:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

// // Delete schedule
// export const deleteSchedule = async (req, res) => {
//   try {
//     const { schedule_id } = req.params;

//     const [result] = await db.query(
//       `DELETE FROM schedules WHERE schedule_id = ?`,
//       [schedule_id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Schedule not found" });
//     }

//     res.json({ message: "Schedule deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting schedule:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

// // Get all subjects
// export const getAllSubjects = async (req, res) => {
//   try {
//     const [subjects] = await db.query(
//       `SELECT subject_id, subject_name FROM subjects ORDER BY subject_name`
//     );
//     res.json(subjects);
//   } catch (err) {
//     console.error("Error fetching subjects:", err);
//     res.status(500).json({ message: "Database error", error: err.message });
//   }
// };

import db from "../db/db.js";

// Get timetable for a specific section (e.g., 10A)
export const getSectionTimetable = async (req, res) => {
  try {
    const { standard, section } = req.params;
    const className = `${standard} ${section}`.toUpperCase();

    console.log("📅 Fetching timetable for:", className);

    const [timetable] = await db.query(
      `SELECT 
        sch.schedule_id,
        sch.day_of_week,
        sch.start_time,
        sch.end_time,
        sch.duration,
        c.class_name,
        c.room_number,
        s.subject_name,
        t.name as teacher_name,
        t.teacher_id
       FROM schedules sch
       JOIN classes c ON sch.class_id = c.class_id
       LEFT JOIN subjects s ON c.subject_id = s.subject_id
       LEFT JOIN teachers t ON c.teacher_id = t.teacher_id
       WHERE c.class_name = ?
       ORDER BY sch.day_of_week, sch.start_time`,
      [className]
    );

    if (timetable.length === 0) {
      return res.status(404).json({ 
        message: "No timetable found for this section",
        className 
      });
    }

    res.json(timetable);
  } catch (err) {
    console.error("❌ Error fetching section timetable:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get teachers handling a specific section
export const getSectionTeachers = async (req, res) => {
  try {
    const { standard, section } = req.params;
    const className = `${standard} ${section}`.toUpperCase();

    console.log("👨‍🏫 Fetching teachers for:", className);

    const [teachers] = await db.query(
      `SELECT DISTINCT
        t.teacher_id,
        t.name,
        t.email,
        t.phone,
        s.subject_name
       FROM teachers t
       JOIN classes c ON t.teacher_id = c.teacher_id
       LEFT JOIN subjects s ON t.subject_id = s.subject_id
       WHERE c.class_name = ?`,
      [className]
    );

    res.json(teachers);
  } catch (err) {
    console.error("❌ Error fetching section teachers:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get all available teachers with their subjects
export const getAvailableTeachers = async (req, res) => {
  try {
    const [teachers] = await db.query(
      `SELECT 
        t.teacher_id,
        t.name,
        t.email,
        s.subject_name,
        s.subject_id
       FROM teachers t
       LEFT JOIN subjects s ON t.subject_id = s.subject_id
       ORDER BY t.name`
    );

    res.json(teachers);
  } catch (err) {
    console.error("❌ Error fetching teachers:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Assign teacher to a class
export const assignTeacherToClass = async (req, res) => {
  try {
    const { class_name, teacher_id, subject_id, room_number, student_capacity } = req.body;

    if (!class_name || !teacher_id) {
      return res.status(400).json({ message: "Class name and teacher are required" });
    }

    const [existing] = await db.query(
      `SELECT * FROM classes WHERE class_name = ? AND teacher_id = ? AND subject_id = ?`,
      [class_name, teacher_id, subject_id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ 
        message: "This teacher is already assigned to this class for this subject" 
      });
    }

    const [result] = await db.query(
      `INSERT INTO classes (class_name, teacher_id, subject_id, room_number, student_capacity)
       VALUES (?, ?, ?, ?, ?)`,
      [class_name, teacher_id, subject_id, room_number || null, student_capacity || 40]
    );

    res.status(201).json({ 
      message: "Teacher assigned successfully",
      class_id: result.insertId 
    });
  } catch (err) {
    console.error("❌ Error assigning teacher:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Create schedule entry for a class
export const createSchedule = async (req, res) => {
  try {
    const { class_id, day_of_week, start_time, end_time, duration } = req.body;

    if (!class_id || day_of_week === undefined || !start_time || !end_time) {
      return res.status(400).json({ message: "All schedule fields are required" });
    }

    const [result] = await db.query(
      `INSERT INTO schedules (class_id, day_of_week, start_time, end_time, duration)
       VALUES (?, ?, ?, ?, ?)`,
      [class_id, day_of_week, start_time, end_time, duration || 45]
    );

    res.status(201).json({ 
      message: "Schedule created successfully",
      schedule_id: result.insertId 
    });
  } catch (err) {
    console.error("❌ Error creating schedule:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Update schedule
export const updateSchedule = async (req, res) => {
  try {
    const { schedule_id } = req.params;
    const { day_of_week, start_time, end_time, duration } = req.body;

    const [result] = await db.query(
      `UPDATE schedules 
       SET day_of_week = ?, start_time = ?, end_time = ?, duration = ?
       WHERE schedule_id = ?`,
      [day_of_week, start_time, end_time, duration, schedule_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ message: "Schedule updated successfully" });
  } catch (err) {
    console.error("❌ Error updating schedule:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Delete schedule
export const deleteSchedule = async (req, res) => {
  try {
    const { schedule_id } = req.params;

    const [result] = await db.query(
      `DELETE FROM schedules WHERE schedule_id = ?`,
      [schedule_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting schedule:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

// Get all subjects
export const getAllSubjects = async (req, res) => {
  try {
    const [subjects] = await db.query(
      `SELECT subject_id, subject_name FROM subjects ORDER BY subject_name`
    );
    res.json(subjects);
  } catch (err) {
    console.error("❌ Error fetching subjects:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

