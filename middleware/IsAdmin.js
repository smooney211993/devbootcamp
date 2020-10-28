const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== 'admin') {
    res.status(400);
    throw new Error('User Is Not Authorized As Admin');
  }
  next();
});

module.exports = isAdmin;
