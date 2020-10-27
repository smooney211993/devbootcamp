const asyncHandler = require('express-async-handler');
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
  const token = user.getSignedJwtToken();
  res.json({ success: true, token: token });
});
// login
// api/v1/login
//post
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please Provide Email And Password');
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(400);
    throw new Error('Invalid Credentials');
  }

  if (user && (await user.matchPassword(password))) {
    sendTokenResponse(user, 200, res);
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});
// api/v1.auth/me
//private needs webtoken
// gets logged user
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});
// ap1/v1/auth/forgotpassword
//public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error('There Is No Account With This Email');
  }

  const resetToken = user.getResetPasswordtoken();
  await user.save({ validateBeforeSave: false });
  res.json({
    success: true,
    data: user,
  });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
};
