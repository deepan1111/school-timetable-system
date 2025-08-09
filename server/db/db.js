const mysql12 = require("mysql2");
require("dotenv").config();

const db = mysql12.createConnection({
   host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.error("Error connecting to DB:", err);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;