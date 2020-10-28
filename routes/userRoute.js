const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');
const advanceResults = require('../middleware/advanceResults');
const {
  getUsersAsAdmin,
  getUserByIdAsAdmin,
  createUserAsAdmin,
  updateUserAsAdmin,
  deleteUserAsAdmin,
} = require('../controllers/userController');
const User = require('../models/User');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(authToken, isAdmin, advanceResults(User), getUsersAsAdmin)
  .post(authToken, isAdmin, createUserAsAdmin);

router
  .route('/:id')
  .get(authToken, isAdmin, getUserByIdAsAdmin)
  .put(authToken, isAdmin, updateUserAsAdmin)
  .delete(authToken, isAdmin, deleteUserAsAdmin);

module.exports = router;
