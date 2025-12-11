import Student from "../models/studentModel.js";
import { uploadToS3 } from "../utils/s3Upload.js";

export const registerStudent = async (req, res) => {
  try {
    const {
      firstName, lastName, fatherName, motherName,
      phoneNumber, email, dateOfBirth, category
    } = req.body;

    const files = req.files;

    const marksheet10 = await uploadToS3(files.marksheet10[0], "marksheets");
    const marksheet12 = await uploadToS3(files.marksheet12[0], "marksheets");
    const marksheetGrad = await uploadToS3(files.marksheetGrad[0], "marksheets");

    const marksheetSem = await Promise.all(
      files.marksheetSem.map((f) => uploadToS3(f, "marksheets"))
    );

    const resume = await uploadToS3(files.resume[0], "resumes");

    const student = new Student({
      firstName,
      lastName,
      fatherName,
      motherName,
      phoneNumber,
      email,
      dateOfBirth,
      category,
      documents: {
        marksheet10,
        marksheet12,
        marksheetGrad,
        marksheetSem,
        resume,
      },
    });

    await student.save();

    res.status(201).json({
      message: "Student registered successfully!",
      student
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};



// ================================
// 👉 ADD THESE FUNCTIONS
// ================================

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student", error: err.message });
  }
};
