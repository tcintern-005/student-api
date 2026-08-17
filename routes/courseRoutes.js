const authMiddleware = require("../middleware/authMiddleware");
const validateCourse = require("../middleware/validateCourse");

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
router.get("/:id", authMiddleware, getCourseById);

// CREATE course
router.post(
  "/",
  authMiddleware,
  validateCourse,
  addCourse
);

// UPDATE course
router.put(
  "/:id",
  authMiddleware,
  validateCourse,
  updateCourse
);

// DELETE course
router.delete(
  "/:id",
  authMiddleware,
  deleteCourse
);

module.exports = router;