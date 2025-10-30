
// import db from "../db/db.js";

// // Get Dashboard Statistics
// export const getDashboardStats = async (req, res) => {
//   try {
//     // Check if user is admin
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied. Admin only." });
//     }

//     // Total active teachers
//     const [teachers] = await db.query(
//       "SELECT COUNT(*) as count FROM teachers"
//     );

//     // Total subjects
//     const [subjects] = await db.query(
//       "SELECT COUNT(*) as count FROM subjects"
//     );

//     // Check if created_at column exists in teachers table
//     const [tableInfo] = await db.query(
//       "SHOW COLUMNS FROM teachers LIKE 'created_at'"
//     );

//     let recentTeachers = [{ count: 0 }];
//     let teachersLastMonth = [{ count: teachers[0].count }];
    
//     // Only query created_at if column exists
//     if (tableInfo.length > 0) {
//       // Recent teachers (last 30 days)
//       [recentTeachers] = await db.query(
//         "SELECT COUNT(*) as count FROM teachers WHERE DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)"
//       );

//       // Growth calculation (comparing with last month)
//       const lastMonth = new Date();
//       lastMonth.setMonth(lastMonth.getMonth() - 1);
//       const lastMonthStr = lastMonth.toISOString().split("T")[0];

//       [teachersLastMonth] = await db.query(
//         "SELECT COUNT(*) as count FROM teachers WHERE created_at <= ?",
//         [lastMonthStr]
//       );
//     }

//     const teacherGrowth = teachersLastMonth[0].count
//       ? (((teachers[0].count - teachersLastMonth[0].count) / teachersLastMonth[0].count) * 100).toFixed(1)
//       : 0;

//     res.json({
//       totalTeachers: teachers[0].count,
//       totalSubjects: subjects[0].count,
//       recentTeachers: recentTeachers[0].count,
//       totalClasses: 0, // You can add this when you have classes table
//       activeClasses: 0, // You can add this when you have timetables table
//       growth: {
//         teachers: teacherGrowth,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching dashboard stats:", error);
//     res.status(500).json({ 
//       error: "Failed to fetch dashboard statistics",
//       details: error.message 
//     });
//   }
// };

// // Get Recent Activity (You'll need to create activities table first)
// export const getRecentActivity = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied. Admin only." });
//     }

//     // For now, return empty array until activities table is created
//     // You can add activity logging later
//     res.json([]);
    
//   } catch (error) {
//     console.error("Error fetching recent activity:", error);
//     res.status(500).json({ error: "Failed to fetch recent activity" });
//   }
// };

// // Get System Status
// export const getSystemStatus = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied. Admin only." });
//     }

//     // Check database connection
//     await db.query("SELECT 1");
//     const dbStatus = "connected";

//     // Get server uptime
//     const uptime = process.uptime();
//     const uptimeFormatted = formatUptime(uptime);

//     // Memory usage
//     const memoryUsage = process.memoryUsage();
//     const memoryUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
//     const memoryTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);

//     // Get total users
//     const [admins] = await db.query("SELECT COUNT(*) as count FROM admin");
//     const [teachers] = await db.query("SELECT COUNT(*) as count FROM teachers");
//     const totalUsers = admins[0].count + teachers[0].count;

//     res.json({
//       server: "online",
//       database: dbStatus,
//       uptime: uptimeFormatted,
//       memory: {
//         used: `${memoryUsed} MB`,
//         total: `${memoryTotal} MB`,
//       },
//       activeUsers: totalUsers,
//     });
//   } catch (error) {
//     console.error("Error fetching system status:", error);
//     res.status(500).json({
//       server: "online",
//       database: "error",
//       error: "Failed to fetch complete system status",
//     });
//   }
// };

// // Get Teacher Statistics
// export const getTeacherStats = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied. Admin only." });
//     }

//     // Get teachers with subjects
//     const [teachers] = await db.query(`
//       SELECT t.*, s.subject_name
//       FROM teachers t
//       LEFT JOIN subjects s ON t.subject_id = s.subject_id
//     `);

//     // Group by subject
//     const subjectDistribution = teachers.reduce((acc, teacher) => {
//       const subject = teacher.subject_name || "Unassigned";
//       acc[subject] = (acc[subject] || 0) + 1;
//       return acc;
//     }, {});

//     res.json({
//       total: teachers.length,
//       subjectDistribution,
//     });
//   } catch (error) {
//     console.error("Error fetching teacher stats:", error);
//     res.status(500).json({ error: "Failed to fetch teacher statistics" });
//   }
// };

// // Helper Functions
// function formatUptime(seconds) {
//   const days = Math.floor(seconds / 86400);
//   const hours = Math.floor((seconds % 86400) / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);

//   if (days > 0) return `${days}d ${hours}h`;
//   if (hours > 0) return `${hours}h ${minutes}m`;
//   return `${minutes}m`;
// }

import db from "../db/db.js";

// Get Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const [teachers] = await db.query(
      "SELECT COUNT(*) as count FROM teachers"
    );

    const [subjects] = await db.query(
      "SELECT COUNT(*) as count FROM subjects"
    );

    const [tableInfo] = await db.query(
      "SHOW COLUMNS FROM teachers LIKE 'created_at'"
    );

    let recentTeachers = [{ count: 0 }];
    let teachersLastMonth = [{ count: teachers[0].count }];
    
    if (tableInfo.length > 0) {
      [recentTeachers] = await db.query(
        "SELECT COUNT(*) as count FROM teachers WHERE DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)"
      );

      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      const lastMonthStr = lastMonth.toISOString().split("T")[0];

      [teachersLastMonth] = await db.query(
        "SELECT COUNT(*) as count FROM teachers WHERE created_at <= ?",
        [lastMonthStr]
      );
    }

    const teacherGrowth = teachersLastMonth[0].count
      ? (((teachers[0].count - teachersLastMonth[0].count) / teachersLastMonth[0].count) * 100).toFixed(1)
      : 0;

    res.json({
      totalTeachers: teachers[0].count,
      totalSubjects: subjects[0].count,
      recentTeachers: recentTeachers[0].count,
      totalClasses: 0,
      activeClasses: 0,
      growth: {
        teachers: teacherGrowth,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ 
      error: "Failed to fetch dashboard statistics",
      details: error.message 
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }
    res.json([]);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
};

export const getSystemStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    await db.query("SELECT 1");
    const dbStatus = "connected";

    const uptime = process.uptime();
    const uptimeFormatted = formatUptime(uptime);

    const memoryUsage = process.memoryUsage();
    const memoryUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const memoryTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);

    const [admins] = await db.query("SELECT COUNT(*) as count FROM admin");
    const [teachers] = await db.query("SELECT COUNT(*) as count FROM teachers");
    const totalUsers = admins[0].count + teachers[0].count;

    res.json({
      server: "online",
      database: dbStatus,
      uptime: uptimeFormatted,
      memory: {
        used: `${memoryUsed} MB`,
        total: `${memoryTotal} MB`,
      },
      activeUsers: totalUsers,
    });
  } catch (error) {
    console.error("Error fetching system status:", error);
    res.status(500).json({
      server: "online",
      database: "error",
      error: "Failed to fetch complete system status",
    });
  }
};

export const getTeacherStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const [teachers] = await db.query(`
      SELECT t.*, s.subject_name
      FROM teachers t
      LEFT JOIN subjects s ON t.subject_id = s.subject_id
    `);

    const subjectDistribution = teachers.reduce((acc, teacher) => {
      const subject = teacher.subject_name || "Unassigned";
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {});

    res.json({
      total: teachers.length,
      subjectDistribution,
    });
  } catch (error) {
    console.error("Error fetching teacher stats:", error);
    res.status(500).json({ error: "Failed to fetch teacher statistics" });
  }
};

// NEW: Get specific teacher by ID (for admin)
export const getTeacherById = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const { id } = req.params;

    const [teacher] = await db.query(
      `SELECT t.teacher_id, t.name, t.email, t.phone, t.subject_id, s.subject_name, t.created_at
       FROM teachers t
       LEFT JOIN subjects s ON t.subject_id = s.subject_id
       WHERE t.teacher_id = ?`,
      [id]
    );

    if (teacher.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Get teacher's classes
    const [classes] = await db.query(
      `SELECT c.class_id, c.class_name, c.room_number, c.current_enrolled as student_count, s.subject_name
       FROM classes c
       LEFT JOIN subjects s ON c.subject_id = s.subject_id
       WHERE c.teacher_id = ?`,
      [id]
    );

    res.json({
      ...teacher[0],
      classes
    });
  } catch (err) {
    console.error("Error fetching teacher:", err);
    res.status(500).json({ message: "Error fetching teacher", error: err.message });
  }
};

// NEW: Update any teacher (admin only)
export const updateTeacherById = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const { id } = req.params;
    const { name, phone, subject_id, email } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ message: "Name, phone, and email are required" });
    }

    // Check if email is already used by another teacher
    const [existing] = await db.query(
      `SELECT teacher_id FROM teachers WHERE email = ? AND teacher_id != ?`,
      [email, id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    await db.query(
      `UPDATE teachers SET name = ?, phone = ?, subject_id = ?, email = ? WHERE teacher_id = ?`,
      [name, phone, subject_id, email, id]
    );

    res.json({ message: "Teacher updated successfully" });
  } catch (err) {
    console.error("Error updating teacher:", err);
    res.status(500).json({ message: "Error updating teacher", error: err.message });
  }
};

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}