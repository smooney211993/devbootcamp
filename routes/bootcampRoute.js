const express = require('express');
const router = express.Router();
const {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
  deleteBootCamp,
} = require('../controllers/bootcampController');

router.route('/').post(createNewBootCamp).get(getBootCamps);
router.route('/:id').get(getBootCampById).delete(deleteBootCamp);

module.exports = router;
