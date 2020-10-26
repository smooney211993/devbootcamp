const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const isAuthorized = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== 'publisher') {
    res.status(401);
    throw new Error('Not Authorized As Publisher');
  } else if (user.role !== 'admin') {
    res.status(401);
    throw new Error('Not Authorized As Admin');
  }
  next();
});

module.exports = isAuthorized;
