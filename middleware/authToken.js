const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const authToken = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Token Is Not Valid');
      // if token does exist but however valid send this error message
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('No token, Authorization not granted');
  }
};

module.exports = authToken;
