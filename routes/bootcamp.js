const express = require('express');
const router = express.Router();
const { createNewBootCamp } = require('../controllers/bootcamps');

router.route('/').post(createNewBootCamp);
module.exports = router;
