const express = require("express");
const router = express.Router();

const {
  getStudents,
  getStudentById,
  searchCourse,
} = require("../controllers/studentController");

router.get("/students", getStudents);
router.get("/students/:id", getStudentById);
router.get("/search", searchCourse);

module.exports = router;