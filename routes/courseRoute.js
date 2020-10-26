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
  .post(createCourse);
router.route('/:id').get(getCourseById).put(updateCourse).delete(deleteCourse);

module.exports = router;
