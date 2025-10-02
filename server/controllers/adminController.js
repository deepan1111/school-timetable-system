import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Class from "../models/Class.js";
import Activity from "../models/Activity.js";
import Timetable from "../models/Timetable.js";

// Get Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    // Get total teachers
    const totalTeachers = await Teacher.countDocuments({ isActive: true });

    // Get total students
    const totalStudents = await Student.countDocuments({ isActive: true });

    // Get total classes (distinct class-section combinations)
    const totalClasses = await Class.countDocuments();

    // Get active classes today
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    
    const activeClasses = await Timetable.countDocuments({
      date: todayStr,
      status: "active",
    });

    // Calculate growth percentages (comparing with last month)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const teachersLastMonth = await Teacher.countDocuments({
      createdAt: { $lte: lastMonth },
      isActive: true,
    });

    const studentsLastMonth = await Student.countDocuments({
      createdAt: { $lte: lastMonth },
      isActive: true,
    });

    const teacherGrowth = teachersLastMonth
      ? (((totalTeachers - teachersLastMonth) / teachersLastMonth) * 100).toFixed(1)
      : 0;

    const studentGrowth = studentsLastMonth
      ? (((totalStudents - studentsLastMonth) / studentsLastMonth) * 100).toFixed(1)
      : 0;

    res.json({
      totalTeachers,
      totalStudents,
      totalClasses,
      activeClasses,
      growth: {
        teachers: teacherGrowth,
        students: studentGrowth,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard statistics" });
  }
};

// Get Recent Activity
export const getRecentActivity = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const limit = parseInt(req.query.limit) || 20;

    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("userId", "name email")
      .lean();

    const formattedActivities = activities.map((activity) => ({
      id: activity._id,
      description: activity.description,
      timestamp: formatTimestamp(activity.createdAt),
      type: activity.type,
      user: activity.userId?.name || "System",
      metadata: activity.metadata,
    }));

    res.json(formattedActivities);
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
};

// Get System Status
export const getSystemStatus = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    // Check database connection
    const dbStatus = "connected"; // You can add actual DB health check

    // Get server uptime
    const uptime = process.uptime();
    const uptimeFormatted = formatUptime(uptime);

    // Memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const memoryTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);

    res.json({
      server: "online",
      database: dbStatus,
      uptime: uptimeFormatted,
      memory: {
        used: `${memoryUsed} MB`,
        total: `${memoryTotal} MB`,
      },
    });
  } catch (error) {
    console.error("Error fetching system status:", error);
    res.status(500).json({ error: "Failed to fetch system status" });
  }
};

// Get Teacher Statistics
export const getTeacherStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const teachers = await Teacher.find({ isActive: true }).lean();

    // Group by subject
    const subjectDistribution = teachers.reduce((acc, teacher) => {
      const subject = teacher.subject || "Unassigned";
      acc[subject] = (acc[subject] || 0) + 1;
      return acc;
    }, {});

    // Group by experience
    const experienceDistribution = {
      junior: 0, // 0-2 years
      mid: 0, // 3-5 years
      senior: 0, // 6+ years
    };

    teachers.forEach((teacher) => {
      const exp = teacher.experience || 0;
      if (exp <= 2) experienceDistribution.junior++;
      else if (exp <= 5) experienceDistribution.mid++;
      else experienceDistribution.senior++;
    });

    res.json({
      total: teachers.length,
      subjectDistribution,
      experienceDistribution,
    });
  } catch (error) {
    console.error("Error fetching teacher stats:", error);
    res.status(500).json({ error: "Failed to fetch teacher statistics" });
  }
};

// Get Class Statistics
export const getClassStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    const classes = await Class.find().lean();

    // Group by standard
    const standardDistribution = classes.reduce((acc, cls) => {
      const std = cls.standard || "Unknown";
      acc[std] = (acc[std] || 0) + 1;
      return acc;
    }, {});

    // Get student count per class
    const classStudentCount = await Promise.all(
      classes.map(async (cls) => ({
        class: `${cls.standard}-${cls.section}`,
        students: await Student.countDocuments({
          standard: cls.standard,
          section: cls.section,
        }),
      }))
    );

    res.json({
      total: classes.length,
      standardDistribution,
      classStudentCount,
    });
  } catch (error) {
    console.error("Error fetching class stats:", error);
    res.status(500).json({ error: "Failed to fetch class statistics" });
  }
};

// Helper Functions
function formatTimestamp(date) {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000); // seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return new Date(date).toLocaleDateString();
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}