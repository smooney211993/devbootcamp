const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
} = require('../controllers/authController');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(authToken, getMe);
router.route('/me/updatedetails').put(authToken, updateDetails);
router.route('/me/updatepassword').put(authToken, updatePassword);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').put(resetPassword);

module.exports = router;
