

// // const mysql = require("mysql2/promise");
// // require("dotenv").config();

// // const db = mysql.createPool({
// //   host: process.env.DB_HOST,
// //   user: process.env.DB_USER,
// //   password: process.env.DB_PASS,
// //   database: process.env.DB_NAME
// // });

// // module.exports = db;


// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Test connection
// db.getConnection()
//   .then((connection) => {
//     console.log("✅ MySQL Database Connected");
//     connection.release();
//   })
//   .catch((err) => {
//     console.error("❌ MySQL Connection Error:", err);
//   });

// export default db;
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let db;

async function connectDB() {
  try {
    db = await mysql.createPool({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await db.getConnection();
    console.log("✅ MySQL Database Connected");
    connection.release();
  } catch (err) {
    console.error("❌ MySQL Connection Error:", err.message);
    console.log("🔁 Retrying in 5 seconds...");
    setTimeout(connectDB, 5000); // Retry instead of crashing server
  }
}

connectDB();
export default db;
