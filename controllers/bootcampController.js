const asyncHandler = require('express-async-handler');
const geocoder = require('../utils/geocoder');
const Bootcamp = require('../models/Bootcamps');

// create new bootcamp
// post request
//api/v1/bootcamps
const createNewBootCamp = asyncHandler(async (req, res) => {
  const newBootCamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: newBootCamp });
});

// get all bootcamps
//get request
//api/v1/bootcamps
const getBootCamps = asyncHandler(async (req, res) => {
  const bootcamps = await Bootcamp.find({});
  if (!bootcamps) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});
// get bootcamps via id
//get request
//api/v1/bootcamps/:id
const getBootCampById = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
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
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  await bootcamp.remove();
  res.status(200).json({ success: true, msg: 'Bootcamp Successfully Deleted' });
});
// update bootcamps via id
//put request
//api/v1/bootcamps/:id
const updateBootCamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  res.status(200).json({ success: true, data: bootcamp });
});

// getbootcamps within a radius
// api/v1/bootcamps/radius/:zipcode/:distance

const getBootcampsViaRadius = asyncHandler(async (req, res) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const { lattitude, longitude } = loc[0];

  // caluclate radius using radians
  // divide distance by radius of earth
  // radius earth = 6378.1km

  const radius = distance / 6378;
  const bootcamps = await Bootcamps.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, lattitude], radius] },
    },
  });
  if (bootcamps) {
    res.status(404);
    throw new Error('Bootcamps Not Found Within Chosen Radius');
  }
  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

module.exports = {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
  updateBootCamp,
  getBootcampsViaRadius,
};
