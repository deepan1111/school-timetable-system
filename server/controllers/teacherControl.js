import db from "../db/db.js";

export const getAllTeachers = async (req, res) => {
  try {
    // const sql = "SELECT teacher_id, name, email FROM teachers";
     const query = `
    SELECT t.teacher_id, t.name, t.email, s.subject_name
    FROM teachers t
    JOIN subjects s ON t.subject_id = s.subject_id
  `;
    const [rows] = await db.query(query); // ✅ no callback, returns [rows, fields]
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
};
