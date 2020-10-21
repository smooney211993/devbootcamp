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
  let query;
  // copy req.query

  const reqQuery = { ...req.query };

  //fields to exclude

  const removeFields = ['select', 'sort', 'pageNumber', 'keyword'];

  // lopp over the removeFields and delete them from query

  removeFields.forEach((param) => delete reqQuery[param]);

  // create query string

  let queryStr = JSON.stringify(reqQuery);

  // create operators

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  const queryString = JSON.parse(queryStr);
  // finding bootcamps
  query = Bootcamp.find(queryString);
  // select fields
  if (req.query.keyword) {
    const keyword = {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    };
    query = query.find({ ...keyword });
  }
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query.sort('-createdAt');
  }

  // pagination
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const total = await Bootcamp.countDocuments();
  query = query.limit(pageSize).skip(pageSize * (page - 1));

  const bootcamps = await query;
  // creates a pagination object in the response to tell clients how many more bootcamps are on the next page
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: pageSize,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: pageSize,
    };
  }

  if (!bootcamps) {
    res.status(404);
    throw new Error('Bootcamp Not Found');
  }
  res.status(200).json({
    success: true,
    data: bootcamps,
    page,
    pages: Math.ceil(total / pageSize),
    pagination,
  });
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

module.exports = {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
  updateBootCamp,
  getBootcampsViaRadius,
};
