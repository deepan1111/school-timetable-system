const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
require("dotenv").config();

const adminSignup = (req, res) => {
    console.log('Received access_code:', req.body.access_code);
  console.log('Expected ADMIN_ACCESS_CODE:', process.env.ADMIN_ACCESS_CODE);
  const { full_name, email, password, access_code } = req.body;
  if (access_code !== process.env.ADMIN_ACCESS_CODE) {
    return res.status(403).json({ message: 'Invalid access code' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    db.query(
      'INSERT INTO admin (full_name, email, password, access_code) VALUES (?, ?, ?, ?)',
      [full_name, email, hash, access_code],
      (err) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already exists' });
          }
          return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(201).json({ message: 'Admin registered successfully' });
      }
    );
  });
};

// Admin Login
const adminLogin = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = results[0];

    bcrypt.compare(password, admin.password, (err, match) => {
      if (!match) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: admin.admin_id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, role: 'admin', full_name: admin.full_name });
    });
  });
};

module.exports = { adminSignup, adminLogin };
