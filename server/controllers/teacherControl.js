

import db from "../db/db.js";

// Add 'export' keyword here
export const getAllTeachers = async (req, res) => {
  try {
    const query = `
      SELECT t.teacher_id, t.name, t.email, s.subject_name
      FROM teachers t
      JOIN subjects s ON t.subject_id = s.subject_id
    `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};