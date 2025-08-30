
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import teacherRoutes from "./routes/teacher.js";
import authRoutes from "./routes/auth.js";
import protectedRoutes from "./routes/protectedRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
