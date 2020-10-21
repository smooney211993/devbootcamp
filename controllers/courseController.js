const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');

// Get courses
// Get /api/v1/courses
// public

const getCourses = asyncHandler(async (req, res) => {
  let query;
  if (req.params.bootCampId) {
    query = Course.find({ bootcamp: req.params.id });
  } else {
    query = Course.find();
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

module.exports = {
  getCourses,
};
