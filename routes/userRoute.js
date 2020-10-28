const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');
const advanceResults = require('../middleware/advanceResults');
const { getUsersAsAdmin } = require('../controllers/userController');
const User = require('../models/User');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(authToken, isAdmin, advanceResults(User), getUsersAsAdmin);

module.exports = router;
