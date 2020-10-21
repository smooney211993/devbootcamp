const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please Add A Course Title'],
  },
  description: {
    type: String,
    required: [true, 'Please Add A Description'],
  },
  weeks: {
    type: String,
    required: [true, 'Please Add Number Of Weeks'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please Add Cost'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'Please Add Minimum Skill '],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

module.exports = Course = mongoose.model('Course', CourseSchema);
