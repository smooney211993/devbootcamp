const express = require('express');
const router = express.Router();
const {
  createNewBootCamp,
  getBootCamps,
  getBootCampById,
} = require('../controllers/bootcampController');

router.route('/').post(createNewBootCamp).get(getBootCamps);
router.route('/:id').get(getBootCampById);

module.exports = router;
