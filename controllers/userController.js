const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// GET api/v1/auth/users
// private admin

const getUsersAsAdmin = asyncHandler(async (rec, res) => {
  res.status(200).json(res.addvanceResults);
});

module.exports = {
  getUsersAsAdmin,
};
