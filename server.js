const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config({ path: './config/config.env' });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
