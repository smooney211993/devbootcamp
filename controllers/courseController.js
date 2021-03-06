const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');
const Bootcamp = require('../models/Bootcamps');

// Get courses
// Get /api/v1/courses
// public

const getCourses = asyncHandler(async (req, res) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advanceResults);
  }
});

// get a single course
// public
//Get api/v1/course/:id

const getCourseById = asyncHandler(async (req, res) => {
  console.log(req.params.id);
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

const createCourse = asyncHandler(async (req, res) => {
  const { bootcampId } = req.params;
  req.body.bootcamp = bootcampId;
  const bootcampExists = await Bootcamp.findById(bootcampId);
  const user = await User.findById(req.user.id);
  if (!bootcampExists) {
    res.status(404);
    throw new Error(`Bootcamp Does Not Exist With The ID of ${bootcampId}`);
  }
  if (bootcampExists.user.toString() !== req.user.id && user.role !== 'admin') {
    res.status(401);
    throw new Error('Not Authorized To Create A Course To This BootCamp');
  }
  const {
    title,
    description,
    weeks,
    tuition,
    minimumSkill,
    scholarshipAvailable,
    bootcamp,
  } = req.body;
  console.log(req.body);
  const course = new Course({
    title,
    description,
    weeks,
    tuition,
    minimumSkill,
    scholarshipAvailable,
    bootcamp,
    user: req.user.id,
  });
  const newCourse = await course.save();
  res.status(201).json({
    success: true,
    data: newCourse,
  });
});

// update course
//private
//api/v1/courses/:id
const updateCourse = asyncHandler(async (req, res) => {
  let course = await Course.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (course.user.toString !== req.user.id && user.role !== 'admin') {
    res.status(401);
    throw new Error('Not Authorized To Update This Course');
  }
  if (!course) {
    res.status(404);
    throw new Error('Course Not Found');
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: course,
  });
});

const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (course.user.toString !== req.user.id && user.role !== 'admin') {
    res.status(401);
    throw new Error('Not Authorized To Update This Course');
  }
  if (!course) {
    res.status(404);
    throw new Error('Course Not Found');
  }

  await course.remove();
  res.status(200).json({
    success: true,
    msg: 'Course SuccessFully Deleted',
  });
});
module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
