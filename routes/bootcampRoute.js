const express = require('express');
const {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
  updateBootCamp,
  getBootcampsViaRadius,
} = require('../controllers/bootcampController');
// include other resource routers
const courseRouter = require('./courseRoute');
const router = express.Router();

router.use('/:bootcampId', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsViaRadius);
router.route('/').post(createNewBootCamp).get(getBootCamps);
router
  .route('/:id')
  .get(getBootCampById)
  .delete(deleteBootCamp)
  .put(updateBootCamp);

module.exports = router;
