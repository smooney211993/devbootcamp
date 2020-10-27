const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
} = require('../controllers/authController');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(authToken, getMe);
router.route('/forgotpassword').post(forgotPassword);

module.exports = router;
