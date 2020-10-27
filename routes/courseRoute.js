const express = require('express');
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const Course = require('../models/Course');
const advanceResults = require('../middleware/advanceResults');
const authToken = require('../middleware/authToken');
const isAuthorized = require('../middleware/authorize');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advanceResults(Course, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getCourses
  )
  .post(authToken, isAuthorized, createCourse);
router
  .route('/:id')
  .get(getCourseById)
  .put(authToken, isAuthorized, updateCourse)
  .delete(authToken, isAuthorized, deleteCourse);

module.exports = router;
