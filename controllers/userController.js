const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// GET api/v1/auth/users
// private admin

const getUsersAsAdmin = asyncHandler(async (rec, res) => {
  res.status(200).json(res.advanceResults);
});

const getUserByIdAsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error('User Does Not Exist');
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
module.exports = {
  getUsersAsAdmin,
  getUserByIdAsAdmin,
};
