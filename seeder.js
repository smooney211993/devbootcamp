const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Bootcamp = require('./models/Bootcamps');

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
