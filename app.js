const cors = require("cors");
const courseRoutes = require("./routes/courseRoutes");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const errorHandler = require("./middleware/errorhandler");


const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(logger);

// Basic Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Student API",
  });
});

app.get("/courses", (req, res) => {
  res.json({
    message: "All Courses",
  });
});

app.get("/instructors", (req, res) => {
  res.json({
    message: "All Instructors",
  });
});

app.get("/about", (req, res) => {
  res.json({
    message: "Student API built with Express.js",
  });
});

// Student Routes
app.use("/", studentRoutes);

app.use("/api/courses", courseRoutes);
// Custom 404 Route
app.use((req, res) => {
  res.status(404).json({
    error: "404 - Route Not Found",
  });
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});