const validateCourse = (req, res, next) => {
  const {
    title,
    instructor,
    duration,
    level,
  } = req.body;

  if (!title || !instructor || !duration || !level) {
    return res.status(400).json({
      success: false,
      message:
        "Title, instructor, duration and level are required",
    });
  }

  if (
    typeof title !== "string" ||
    typeof instructor !== "string" ||
    typeof duration !== "string" ||
    typeof level !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Title, instructor, duration and level must be strings",
    });
  }

  next();
};

module.exports = validateCourse;