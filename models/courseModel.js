const pool = require("./db");

// Get all courses
const getAllCourses = async () => {
  const result = await pool.query(
    "SELECT * FROM courses ORDER BY id"
  );

  return result.rows;
};

// Get one course by ID
const getCourseById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM courses WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Create a course
const createCourse = async (course) => {
  const { title, instructor, duration, level } = course;

  const result = await pool.query(
    `INSERT INTO courses
    (title, instructor, duration, level)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [title, instructor, duration, level]
  );

  return result.rows[0];
};

// Update a course
const updateCourse = async (id, course) => {
  const { title, instructor, duration, level } = course;

  const result = await pool.query(
    `UPDATE courses
     SET title = $1,
         instructor = $2,
         duration = $3,
         level = $4
     WHERE id = $5
     RETURNING *`,
    [title, instructor, duration, level, id]
  );

  return result.rows[0];
};

// Delete a course
const deleteCourse = async (id) => {
  const result = await pool.query(
    "DELETE FROM courses WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};