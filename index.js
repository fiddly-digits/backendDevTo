require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/server.js');

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
const port = PORT || 8080;

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('DB Connection Succesful');
    app.listen(port, () => {
      console.log('DEV.TO Clone Server is UP');
    });
  })
  .catch((err) => {
    console.log('DB Connection Error');
  });
