const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoSanitize = require('express-mongo-sanitize');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');
//controllers

dotenv.config({ path: './config/config.env' });
connectDB();

const bootcamp = require('./routes/bootcampRoute');
const course = require('./routes/courseRoute');
const auth = require('./routes/authRoute');
const user = require('./routes/userRoute');
const review = require('./routes/reviewRoute');
app.use(express.json());
app.use(cookieParser());

app.use(fileupload());
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
//sanitize
app.use(mongoSanitize());

app.use('/api/v1/bootcamps', bootcamp);
app.use('/api/v1/courses', course);
app.use('/api/v1/auth', auth);
app.use('/api/v1/auth/users', user);
app.use('/api/v1/reviews', review);

// errorhandler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
