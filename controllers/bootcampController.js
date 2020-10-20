const Bootcamp = require('../models/Bootcamps');
const asyncHandler = require('express-async-handler');

const createNewBootCamp = asyncHandler(async (req, res) => {
  const newBootCamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: newBootCamp });
});

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

const getBootCampById = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  res.status(200).json({ success: true, data: bootcamp });
});

const deleteBootCamp = asyncHandler(async (req, res) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  await bootcamp.remove();
  res.status(200).json({ success: true, msg: 'Bootcamp Successfully Deleted' });
});
module.exports = {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
};
