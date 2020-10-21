const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const Bootcamp = require('./models/Bootcamps');
const Course = require('./models/Course');

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);

    await console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log('data destroyed');
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
