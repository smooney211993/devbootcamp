const jwt = require('jsonwebtoken');
const authToken = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  }
  if (!token) {
    res.status(201);
    throw new Error('Authorization Not Granted');
  }
};

module.exports = authToken;
