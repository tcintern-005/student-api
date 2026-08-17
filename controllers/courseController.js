const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../models/courseModel");

// GET all courses
exports.getCourses = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 6;
    const level = req.query.level || "";

    if (page < 1) page = 1;
    if (limit < 1) limit = 6;

    const courses = await getAllCourses({
      page,
      limit,
      level,
    });

    res.status(200).json({
      page,
      limit,
      level,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

// GET course by ID
exports.getCourseById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const course = await getCourseById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Get course error:", error);

    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
};

// ADD a new course
exports.addCourse = async (req, res) => {
  try {
    const {
      title,
      instructor,
      duration,
      level,
    } = req.body;

    if (!title || !instructor || !duration || !level) {
      return res.status(400).json({
        message:
          "Title, instructor, duration and level are required",
      });
    }

    const newCourse = await createCourse({
      title,
      instructor,
      duration,
      level,
      owner_id: req.user.id,
    });

    res.status(201).json({
      message: "Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    console.error("Add course error:", error);

    res.status(500).json({
      message: "Failed to add course",
    });
  }
};

// UPDATE a course
exports.updateCourse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existingCourse = await getCourseById(id);

    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Admin can update any course
    // Normal user can update only their own course
    if (
      req.user.role !== "admin" &&
      existingCourse.owner_id !== req.user.id
    ) {
      return res.status(403).json({
        message:
          "Access denied. You can only update your own courses.",
      });
    }

    const {
      title,
      instructor,
      duration,
      level,
    } = req.body;

    const updatedCourse = await updateCourse(id, {
      title: title || existingCourse.title,
      instructor:
        instructor || existingCourse.instructor,
      duration:
        duration || existingCourse.duration,
      level: level || existingCourse.level,
    });

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("Update course error:", error);

    res.status(500).json({
      message: "Failed to update course",
    });
  }
};

// DELETE a course
exports.deleteCourse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existingCourse = await getCourseById(id);

    if (!existingCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Admin can delete any course
    // Normal user can delete only their own course
    if (
      req.user.role !== "admin" &&
      existingCourse.owner_id !== req.user.id
    ) {
      return res.status(403).json({
        message:
          "Access denied. You can only delete your own courses.",
      });
    }

    const deletedCourse = await deleteCourse(id);

    res.status(200).json({
      message: "Course deleted successfully",
      course: deletedCourse,
    });
  } catch (error) {
    console.error("Delete course error:", error);

    res.status(500).json({
      message: "Failed to delete course",
    });
  }
};