const express = require('express');
const {
  getCourses,
  getCourseById,
  createCourse,
} = require('../controllers/courseController');
const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getCourseById);

module.exports = router;
