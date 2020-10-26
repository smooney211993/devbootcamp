const asyncHandler = require('express-async-handler');
const errorHandler = require('../middleware/errorHandler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// api/v1/auth/register
//public
// register user
const register = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }
  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  res.json(user);
});

module.exports = {
  register,
};
