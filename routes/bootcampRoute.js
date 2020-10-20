const express = require('express');
const router = express.Router();
const {
  createNewBootCamp,
  getBootCamps,
} = require('../controllers/bootcampController');

router.route('/').post(createNewBootCamp).get(getBootCamps);

module.exports = router;
