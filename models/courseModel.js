const pool = require("./db");

// Get courses with pagination + filtering
const getAllCourses = async ({
  page = 1,
  limit = 6,
  level = "",
} = {}) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT *
    FROM courses
  `;

  const values = [];

  if (level) {
    values.push(level);
    query += ` WHERE level = $${values.length}`;
  }

  query += `
    ORDER BY id
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  values.push(limit);
  values.push(offset);

  const result = await pool.query(query, values);

  return result.rows;
};

// Get one course
const getCourseById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM courses WHERE id = $1",
    [id]
  );

  return result.rows[0];
};

// Create course
const createCourse = async (course) => {
  const {
    title,
    instructor,
    duration,
    level,
    owner_id,
  } = course;

  const result = await pool.query(
    `INSERT INTO courses
     (title, instructor, duration, level, owner_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, instructor, duration, level, owner_id]
  );

  return result.rows[0];
};

// Update course
const updateCourse = async (id, course) => {
  const {
    title,
    instructor,
    duration,
    level,
  } = course;

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

// Delete course
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