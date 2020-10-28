const Review = require('../models/Review');
const User = require('../models/User');
const Bootcamp = require('../models/Bootcamps');

const asyncHandler = require('express-async-handler');

// GET api/v1/bootcamps/:bootcampId/reviews
// GET api/v1/reviews
const getReviews = asyncHandler(async (req, res) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advanceResults);
  }
});

// get single review
// api/v1/reviews/:id
// public
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(400);
    throw new Error('Review Not Found');
  }
  res.status(200).json({
    success: true,
    data: review,
  });
});

module.exports = {
  getReviews,
  getReviewById,
};
