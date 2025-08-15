const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
require("dotenv").config();


const adminSignup = async (req, res) => {
  try {
    console.log('Received access_code:', req.body.access_code);
    console.log('Expected ADMIN_ACCESS_CODE:', process.env.ADMIN_ACCESS_CODE);

    const { full_name, email, password, access_code } = req.body;

    if (access_code !== process.env.ADMIN_ACCESS_CODE) {
      return res.status(403).json({ message: 'Invalid access code' });
    }

    const hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO admin (full_name, email, password, access_code) VALUES (?, ?, ?, ?)',
      [full_name, email, hash, access_code]
    );

    res.status(201).json({ message: 'Admin registered successfully' });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Database error', error: err });
  }
};


const teacherSignup = async (req, res) => {
  const { name, email, phone, password, subject } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find or create subject
    const [subjectRows] = await db.query(
      "SELECT subject_id FROM subjects WHERE subject_name = ?",
      [subject]
    );

    let subjectId;
    if (subjectRows.length > 0) {
      subjectId = subjectRows[0].subject_id;
    } else {
      const [insertSubject] = await db.query(
        "INSERT INTO subjects (subject_name) VALUES (?)",
        [subject]
      );
      subjectId = insertSubject.insertId;
    }

    // Insert teacher (no role column)
    const [insertTeacher] = await db.query(
      "INSERT INTO teachers (name, email, phone, password, subject_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, phone, hashedPassword, subjectId]
    );

    // Create JWT (role hardcoded)
    const token = jwt.sign(
      { id: insertTeacher.insertId, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Teacher registered successfully", token });
  } catch (err) {
    console.error("Error in teacherSignup:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};



const commonLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT not configured" });
    }

    const normEmail = String(email).trim().toLowerCase();

    // 1) Try admin
    const [admins] = await db.execute(
      "SELECT admin_id, full_name, email, password FROM admin WHERE LOWER(email) = ?",
      [normEmail]
    );

    if (admins.length > 0) {
      const admin = admins[0];
      const ok = await bcrypt.compare(password, admin.password);
      if (!ok) return res.status(401).json({ message: "Invalid email or password" });

      const token = jwt.sign(
        { id: admin.admin_id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Login successful",
        token,
        user: {
          id: admin.admin_id,
          name: admin.full_name,
          email: admin.email,
          role: "admin",
        },
      });
    }

    // 2) Try teacher
    const [teachers] = await db.execute(
      "SELECT teacher_id, name, email, password FROM teachers WHERE LOWER(email) = ?",
      [normEmail]
    );

    if (teachers.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const teacher = teachers[0];
    const ok = await bcrypt.compare(password, teacher.password);
    if (!ok) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: teacher.teacher_id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: teacher.teacher_id,
        name: teacher.full_name, // <-- use the correct column
        email: teacher.email,
        role: "teacher",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { adminSignup,teacherSignup, commonLogin };
