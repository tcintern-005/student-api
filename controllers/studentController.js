exports.getStudents = (req, res) => {
  res.json({
    message: "All Students",
  });
};

exports.getStudentById = (req, res) => {
  res.json({
    message: "Student Details",
    id: req.params.id,
  });
};

exports.searchCourse = (req, res) => {
  res.json({
    search: req.query.course,
  });
};