const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message;
  if (err.code === 11000) {
    statusCode = 400;
  }
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message);
  }
  res.status(statusCode);
  res.json({
    message: err.message || message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
module.exports = {
  errorHandler,
  notFound,
};
