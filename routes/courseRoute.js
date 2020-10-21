const express = require('express');
const {
  getCourses,
  getCourseById,
} = require('../controllers/courseController');
const router = express.Router({ mergeParams: true });

router.route('/').get(getCourses);
router.route('/:id').get(getCourseById);

module.exports = router;
