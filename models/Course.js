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
  scholarhipsAvailable: {
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

CourseSchema.statics.getAverageCost = async function (bootcampId) {
  const obj = await this.aggregate([
    // match the bootcamp field with the bootcamp thats passedin
    {
      $match: { bootcamp: bootcampId },
    },
    // the calculated object you want to create
    {
      $group: {
        _id: '$bootcamp',
        averageCost: { $avg: '$tuition' },
      },
    },
  ]);

  try {
    if (obj[0]) {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
      });
    } else {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageCost: undefined,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
CourseSchema.post('save', async function () {
  await this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost after remove
CourseSchema.post('remove', async function () {
  await this.constructor.getAverageCost(this.bootcamp);
});
module.exports = Course = mongoose.model('Course', CourseSchema);
