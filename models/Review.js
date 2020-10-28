const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please Add A Title For A Review'],
  },
  text: {
    type: String,
    required: [true, 'Please Add Some Text'],
  },
  rating: {
    type: Number,
    required: [true, 'Please Add A Rating'],
    min: 1,
    max: 5,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = Review = mongoose.model('Review', ReviewSchema);
