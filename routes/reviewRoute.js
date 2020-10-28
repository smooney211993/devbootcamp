const authToken = require('../middleware/authToken');
const advanceResults = require('../middleware/advanceResults');
const Review = require('../models/Review');

const {
  getReviews,
  getReviewById,
} = require('../controllers/reviewController');
const express = require('express');

const router = express.Router({ mergeParams: true });

router.route('/').get(
  advanceResults(Review, {
    path: 'user bootcamp ',
    select: 'name description',
  }),
  getReviews
);

router.route('/:id').get(getReviewById);

module.exports = router;
