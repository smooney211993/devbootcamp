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
const Bootcamp = require('../models/Bootcamps');
const advanceResults = require('../middleware/advanceResults');
// include other resource routers
const courseRouter = require('./courseRoute');
const router = express.Router();

// if this is hit its going to continue on to courseRouter and run into getcourses
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsViaRadius);
router.route('/:id/photo').put(bootcampPhotoUpload);

router.route('/').post(createNewBootCamp).get(getBootCamps);

router
  .route('/:id')
  .get(getBootCampById)
  .delete(deleteBootCamp)
  .put(updateBootCamp);

module.exports = router;
