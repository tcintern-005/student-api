const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// GET all courses
router.get("/", authMiddleware, getCourses);

// GET course by ID
router.get("/:id", getCourseById);

// ADD course
router.post("/", addCourse);

// UPDATE course
router.put("/:id", updateCourse);

// DELETE course
router.delete("/:id", deleteCourse);

module.exports = router;