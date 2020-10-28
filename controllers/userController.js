const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// GET api/v1/auth/users
// private admin

const getUsersAsAdmin = asyncHandler(async (rec, res) => {
  res.status(200).json(res.advanceResults);
});

// GET/api/v1/auth/users/:id
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

//POST api/v1/auth/users
//Create users
//admin only
const createUserAsAdmin = asyncHandler(async (req, res) => {
  const { name, email, role, password } = req.body;
  const newUser = new User({
    name,
    email,
    role,
    password,
    createdAt: Date.now(),
  });
  await newUser.save();
  res.status(201).json({
    success: true,
    data: newUser,
  });
});

// PUT /api/v1/auth/users/:id
const updateUserAsAdmin = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: data,
    data: user,
  });
});

module.exports = {
  getUsersAsAdmin,
  getUserByIdAsAdmin,
  createUserAsAdmin,
  updateUserAsAdmin,
};
