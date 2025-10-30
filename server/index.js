
// // // import express from "express";
// // // import cors from "cors";
// // // import dotenv from "dotenv";

// // // import teacherRoutes from "./routes/teacher.js";
// // // import authRoutes from "./routes/auth.js";
// // // import protectedRoutes from "./routes/protectedRoutes.js";

// // // dotenv.config();

// // // const app = express();

// // // app.use(
// // //   cors({
// // //     origin: "http://localhost:5173", // React dev server
// // //     methods: ["GET", "POST", "PUT", "DELETE"],
// // //     credentials: true,
// // //   })
// // // );

// // // app.use(express.json());

// // // // Routes
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api", protectedRoutes);
// // // app.use("/api", teacherRoutes);

// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });


// // import express from "express";
// // import cors from "cors";
// // import dotenv from "dotenv";

// // import teacherRoutes from "./routes/teacher.js";
// // import authRoutes from "./routes/auth.js";
// // import protectedRoutes from "./routes/protectedRoutes.js";
// // import adminRoutes from "./routes/admin.js"; // NEW
// // import teacherDashboardRoutes from "./routes/teacherDashboard.js";

// // dotenv.config();

// // const app = express();

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     credentials: true,
// //   })
// // );



// // app.use(express.json());

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api", protectedRoutes);
// // app.use("/api", teacherRoutes);
// // app.use("/api", adminRoutes); // NEW
// // app.use("/api", teacherDashboardRoutes);
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import teacherRoutes from "./routes/teacher.js";
// import authRoutes from "./routes/auth.js";
// import protectedRoutes from "./routes/protectedRoutes.js";
// import adminRoutes from "./routes/admin.js";
// import teacherDashboardRoutes from "./routes/teacherDashboard.js"; // ADD THIS
// import timetableRoutes from "./routes/timetable.js";

// dotenv.config();

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api", protectedRoutes);
// app.use("/api", teacherRoutes);
// app.use("/api", adminRoutes);
// app.use("/api", teacherDashboardRoutes); // ADD THIS

// app.use("/api", timetableRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// backend/server.js - COMPLETE FILE
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import teacherRoutes from "./routes/teacher.js";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import adminRoutes from "./routes/admin.js";
import teacherDashboardRoutes from "./routes/teacherDashboard.js";
import timetableRoutes from "./routes/timetable.js"; // ✅ ADD THIS LINE

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes - ORDER MATTERS!
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", teacherRoutes);
app.use("/api", adminRoutes);
app.use("/api", teacherDashboardRoutes);
app.use("/api/timetable", timetableRoutes);

// Test route to verify server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Timetable routes registered`); // ✅ ADD THIS for debugging
});

export default app;