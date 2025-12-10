import dotenv from "dotenv";
dotenv.config();   // ✅ Load env FIRST

import express from "express";
import cors from "cors";
import path from "path";

// DB Connection
import "./config/db.js";   // ✅ env is loaded before this

// Routes
import userRoutes from "./routes/userRoutes.js";
import formRoutes from "./routes/formRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";

const app = express();

// Fix __dirname in ES modules
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// Static route for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/forms", formRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/registration", registrationRoutes);

// Serve client build (for production)
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch-all route for SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
