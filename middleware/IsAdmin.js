const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.profile !== 'admin') {
    res.status(400);
    throw new Error('User Is Not Authorized As Admin');
  }
  next();
};

module.exports = isAdmin;
