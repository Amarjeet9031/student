import express from "express";
import upload from "../middleware/uploadMemory.js";
import { registerStudent, getAllStudents, getStudentById } from "../controllers/studentController.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    { name: "marksheet10", maxCount: 1 },
    { name: "marksheet12", maxCount: 1 },
    { name: "marksheetGrad", maxCount: 1 },
    { name: "marksheetSem", maxCount: 10 },
    { name: "resume", maxCount: 1 },
  ]),
  registerStudent
);

router.get("/", getAllStudents);
router.get("/:id", getStudentById);



export default router;
