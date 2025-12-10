import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";
import { registerStudent, getAllStudents, getStudentById } from "../controllers/studentController.js";

const router = express.Router();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

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
