const Review = require('../models/Review');
const User = require('../models/User');
const Bootcamp = require('../models/Bootcamps');

const asyncHandler = require('express-async-handler');

const getReviews = asyncHandler(async (req, res) => {
  if (req.params.bootcampId) {
    const reviews = await Review.findById({ bootcamp: req.params.bootcampId });
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
