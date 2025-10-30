import api from "./axios";

// Get teacher profile
export const getTeacherProfile = async () => {
  const response = await api.get("/teacher/profile");
  return response.data;
};

// Get teacher's assigned classes
export const getTeacherClasses = async () => {
  const response = await api.get("/teacher/classes");
  return response.data;
};

// Get today's schedule
export const getTodaySchedule = async () => {
  const response = await api.get("/teacher/schedule/today");
  return response.data;
};

// Get dashboard statistics
export const getTeacherStats = async () => {
  const response = await api.get("/teacher/stats");
  return response.data;
};

// Get recent activity
export const getRecentActivity = async () => {
  const response = await api.get("/teacher/activity");
  return response.data;
};

// Mark attendance
export const markAttendance = async (classId, attendanceData) => {
  const response = await api.post(`/teacher/attendance/${classId}`, attendanceData);
  return response.data;
};

// Create assignment
export const createAssignment = async (assignmentData) => {
  const response = await api.post("/teacher/assignments", assignmentData);
  return response.data;
};

// Upload study material
export const uploadMaterial = async (materialData) => {
  const response = await api.post("/teacher/materials", materialData);
  return response.data;
};