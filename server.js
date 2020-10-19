const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
connectDB();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
