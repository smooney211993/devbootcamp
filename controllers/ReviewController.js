const Review = require('../models/Review');
const User = require('../models/User');
const Bootcamp = require('../models/Bootcamps');

const asyncHandler = require('express-async-handler');

// GET api/v1/bootcamps/:bootcampId/reviews
// GET api/v1/reviews
const getReviews = asyncHandler(async (req, res) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    }).populate({ path: 'user', select: 'name' });
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
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  if (!review) {
    res.status(400);
    throw new Error('Review Not Found');
  }
  res.status(200).json({
    success: true,
    data: review,
  });
});

// Add Reviw
// POST /api/v1/bootcamps:bootcampId/reviews
// private

const addReview = asyncHandler(async (req, res) => {
  const { bootcampId } = req.params;
  const { title, text, rating } = req.body;
  const bootcamp = await Bootcamp.findById(bootcampId);
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Does Not Exist');
  }

  const reviewExists = await Review.findOne({
    bootcamp: bootcampId,
    user: req.user.id,
  });
  console.log(reviewExists);
  if (reviewExists) {
    res.status(400);
    throw new Error('User Already Submitted A Review');
  }
  console.log(reviewExists);
  const newReview = new Review({
    title,
    text,
    rating,
    user: req.user.id,
    bootcamp: bootcampId,
  });
  await newReview.save();
  res.status(201).json({
    success: true,
    data: newReview,
  });
});

//update review
// api/v1/reviews/:id
// admin and user who made the review
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!review) {
    res.status(404);
    throw new Error('Review Does Not Exist');
  }
  if (review.user.toString() !== req.user.id && user.role !== 'admin') {
    res.status(400);
    throw new Error('Not Authorized To Update Review');
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: updatedReview,
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!review) {
    res.status(404);
    throw new Error('Review Does Not Exist');
  }
  if (review.user.toString() !== req.user.id && user.role !== 'admin') {
    res.status(400);
    throw new Error('Not Authorized To Update Review');
  }

  await review.remove();
  res.status(200).json({
    success: true,
    data: 'Review Successfully Deleted',
  });
});

module.exports = {
  getReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
};
