const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorHandler');
//controllers
const bootcamp = require('./routes/bootcampRoute');

dotenv.config({ path: './config/config.env' });
connectDB();
app.use(express.json());

app.use('/api/v1/bootcamps', bootcamp);

// errorhandler
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
