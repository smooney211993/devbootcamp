const express = require('express');
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
} = require('../controllers/courseController');
const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getCourseById).put(updateCourse);

module.exports = router;
