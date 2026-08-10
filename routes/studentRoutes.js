const express = require("express");
const router = express.Router();

const {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// GET all students
router.get("/students", getStudents);

// GET student by ID
router.get("/students/:id", getStudentById);

// ADD student
router.post("/students", addStudent);

// UPDATE student
router.put("/students/:id", updateStudent);

// DELETE student
router.delete("/students/:id", deleteStudent);

module.exports = router;