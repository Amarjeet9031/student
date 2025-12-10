import mongoose from "mongoose";

console.log("MONGO_URI:", process.env.MONGO_URI); // 🔍 check if env is loaded

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));
