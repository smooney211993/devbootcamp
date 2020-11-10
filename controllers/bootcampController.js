const path = require('path');
const asyncHandler = require('express-async-handler');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamps');
const User = require('../models/User');

// create new bootcamp
// post request
//api/v1/bootcamps
const createNewBootCamp = asyncHandler(async (req, res) => {
  req.body.user = req.user.id;
  const user = await User.findById(req.user.id);
  const publishedBootCamp = await Bootcamp.findOne({ user: req.user.id });
  if (publishedBootCamp && user.role !== 'admin') {
    res.status(400);
    throw new Error('User Has Already Published A Bootcamp');
  }
  const newBootCamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: newBootCamp });
});

// get all bootcamps
//get request
//api/v1/bootcamps
const getBootCamps = asyncHandler(async (req, res) => {
  res.status(200).json(res.advanceResults);
});

// get bootcamps via id
//get request
//api/v1/bootcamps/:id
const getBootCampById = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id).populate('courses');
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  res.status(200).json({ success: true, data: bootcamp });
});
// delete bootcamps via id
//delete request
//api/v1/bootcamps/:id
const deleteBootCamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  if (bootcamp.user.toString() !== req.user.id && user.role !== 'admin') {
    res.status(401);
    throw new Error('Not Authorized To Delete This BootCamp');
  }
  await bootcamp.remove();
  res.status(200).json({ success: true, msg: 'Bootcamp Successfully Deleted' });
});
// update bootcamps via id
//put request
//api/v1/bootcamps/:id
const updateBootCamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  const user = await User.findById(req.user.id);
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  if (bootcamp.user.toString() !== req.user.id && user.role !== 'admin') {
    res.status(401);
    throw new Error('Not Authorized To Update This BootCamp');
  }

  const updatedBootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: updatedBootcamp });
});

// getbootcamps within a radius
// api/v1/bootcamps/radius/:zipcode/:distance

const getBootcampsViaRadius = asyncHandler(async (req, res) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const { latitude, longitude } = loc[0];
  const lat = loc[0].latitude;

  // caluclate radius using radians
  // divide distance by radius of earth
  // radius earth = 6378.1km

  const radius = distance / 6378;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

// upload photo for bootcamp
// PUT api/v1/bootcamps/:id/photo
// private

const bootcampPhotoUpload = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  const user = await User.findById(req.user.id);
  console.log(req.files);

  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }

  if (bootcamp.user.toString() !== req.user.id && user.role !== 'admin') {
    res.status(401);
    throw new Error('Not Authorized To Update This BootCamp');
  }

  if (!req.files) {
    res.status(400);
    throw new Error('Please Upload File');
  }
  const file = req.files[''];

  if (!file.mimetype.startsWith('image')) {
    res.status(400);
    throw new Error('Please Upload An Image File');
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    res.status(400);
    throw new Error('File Size Limit Exceeded ');
  }

  file.name = `/photo_${bootcamp._id}${path.parse(file.name).ext}`;
  // custom file name

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (error) => {
    if (error) {
      console.log(error);
      throw new Error('Problem With File Upload');
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, {
      photo: file.name,
    });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
  console.log(req.files);
});

module.exports = {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
  updateBootCamp,
  getBootcampsViaRadius,
  bootcampPhotoUpload,
};
