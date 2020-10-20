const express = require('express');
const router = express.Router();
const {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
  updateBootCamp,
} = require('../controllers/bootcampController');

router.route('/').post(createNewBootCamp).get(getBootCamps);
router
  .route('/:id')
  .get(getBootCampById)
  .delete(deleteBootCamp)
  .put(updateBootCamp);

module.exports = router;
