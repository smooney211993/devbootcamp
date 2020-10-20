const Bootcamp = require('../models/Bootcamps');

const createNewBootCamp = async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({ msg: 'Server Error' });
  }
};

module.exports = {
  createNewBootCamp,
};
