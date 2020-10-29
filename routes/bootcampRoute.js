const express = require('express');
const {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
  updateBootCamp,
  getBootcampsViaRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcampController');
const authToken = require('../middleware/authToken');
const isAuthorized = require('../middleware/authorize');
const Bootcamp = require('../models/Bootcamps');
const advanceResults = require('../middleware/advanceResults');
// include other resource routers
const courseRouter = require('./courseRoute');
const reviewRouter = require('./reviewRoute');
const router = express.Router();

// if this is hit its going to continue on to courseRouter and run into getcourses
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsViaRadius);
router.route('/:id/photo').put(authToken, bootcampPhotoUpload);

router
  .route('/')
  .post(authToken, isAuthorized, createNewBootCamp)
  .get(advanceResults(Bootcamp, 'courses'), getBootCamps);

router
  .route('/:id')
  .get(getBootCampById)
  .delete(authToken, isAuthorized, deleteBootCamp)
  .put(authToken, isAuthorized, updateBootCamp);

module.exports = router;
