const authToken = require('../middleware/authToken');
const advanceResults = require('../middleware/advanceResults');
const Review = require('../models/Review');

const { getReviews } = require('../controllers/reviewController');
const express = require('express');

const router = express.Router({ mergeParams: true });

router.route('/').get(
  advanceResults(Review, {
    path: 'bootcamp',
    select: 'name',
  }),
  getReviews
);

module.exports = router;
