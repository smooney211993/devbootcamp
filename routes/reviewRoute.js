const authToken = require('../middleware/authToken');
const advanceResults = require('../middleware/advanceResults');
const Review = require('../models/Review');

const {
  getReviews,
  getReviewById,
  addReview,
} = require('../controllers/reviewController');
const express = require('express');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    advanceResults(Review, {
      path: 'user bootcamp ',
      select: 'name description',
    }),
    getReviews
  )
  .post(authToken, addReview);

router.route('/:id').get(getReviewById);

module.exports = router;
