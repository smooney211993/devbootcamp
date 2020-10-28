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

module.exports = {
  getReviews,
};
