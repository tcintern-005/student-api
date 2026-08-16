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

// GET all courses - Protected
router.get("/", authMiddleware, getCourses);

// GET course by ID - Protected
router.get("/:id", authMiddleware, getCourseById);

// ADD course - Protected
router.post("/", authMiddleware, addCourse);

// UPDATE course - Protected
router.put("/:id", authMiddleware, updateCourse);

// DELETE course - Protected
router.delete("/:id", authMiddleware, deleteCourse);

module.exports = router;