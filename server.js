const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');
//controllers

dotenv.config({ path: './config/config.env' });
connectDB();

const bootcamp = require('./routes/bootcampRoute');
const course = require('./routes/courseRoute');
app.use(express.json());

app.use(fileupload());
app.use('/api/v1/bootcamps', bootcamp);
app.use('/api/v1/courses', course);

// errorhandler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
