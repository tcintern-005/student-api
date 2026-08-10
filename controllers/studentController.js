const students = require("../models/studentModel");

// GET all students
exports.getStudents = (req, res) => {
  res.status(200).json(students);
};

// GET student by ID
exports.getStudentById = (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(student);
};

// ADD a new student
exports.addStudent = (req, res) => {
  const { name, age, course } = req.body;
  if(!name || !age || !course) {
    return res.status(400).json({
      message: "Name, age, and course are required",
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    age,
    course,
  };

  students.push(newStudent);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent,
  });
};

// UPDATE a student
exports.updateStudent = (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const { name, age, course } = req.body;

  student.name = name || student.name;
  student.age = age || student.age;
  student.course = course || student.course;

  res.status(200).json({
    message: "Student updated successfully",
    student,
  });
};

// DELETE a student
exports.deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const deletedStudent = students.splice(index, 1);

  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent[0],
  });
};