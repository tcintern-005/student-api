const courses = require("../models/courseModel");

// GET all courses
exports.getCourses = (req, res) => {
  res.status(200).json(courses);
};

// GET course by ID
exports.getCourseById = (req, res) => {
  const id = parseInt(req.params.id);

  const course = courses.find((course) => course.id === id);

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  res.status(200).json(course);
};

// ADD a new course
exports.addCourse = (req, res) => {
  const { title, instructor, duration, level } = req.body;

  if (!title || !instructor || !duration || !level) {
    return res.status(400).json({
      message: "Title, instructor, duration and level are required",
    });
  }

  const newCourse = {
    id: courses.length + 1,
    title,
    instructor,
    duration,
    level,
  };

  courses.push(newCourse);

  res.status(201).json({
    message: "Course added successfully",
    course: newCourse,
  });
};

// UPDATE a course
exports.updateCourse = (req, res) => {
  const id = parseInt(req.params.id);

  const course = courses.find((course) => course.id === id);

  if (!course) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  const { title, instructor, duration, level } = req.body;

  course.title = title || course.title;
  course.instructor = instructor || course.instructor;
  course.duration = duration || course.duration;
  course.level = level || course.level;

  res.status(200).json({
    message: "Course updated successfully",
    course,
  });
};

// DELETE a course
exports.deleteCourse = (req, res) => {
  const id = parseInt(req.params.id);

  const index = courses.findIndex((course) => course.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Course not found",
    });
  }

  const deletedCourse = courses.splice(index, 1);

  res.status(200).json({
    message: "Course deleted successfully",
    course: deletedCourse[0],
  });
};