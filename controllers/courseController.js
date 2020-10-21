const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamps');

// Get courses
// Get /api/v1/courses
// public

const getCourses = asyncHandler(async (req, res) => {
  let query;
  if (req.params.bootCampId) {
    query = Course.find({ bootcamp: req.params.id });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }
  const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// get a single course
// public
//Get api/v1/course/:id

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  if (!course) {
    res.status(404);
    throw new Error('Course Not Found');
  }
  res.status(200).json({
    success: true,
    data: course,
  });
});

//Create course
//POST
//private
//api/v1/bootcamps/:bootcampId/courses

const createCourse = asyncHandler(async (req, res) => {});
module.exports = {
  getCourses,
  getCourseById,
};
