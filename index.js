require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/server.js');

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

//console.log("variables de entorno", process.env);

mongoose
  .connect(dbURL)
  .then(() => {
    console.log('DB Connection Succesful');
    app.listen(8080, () => {
      console.log('DEV.TO Clone Server is UP');
    });
  })
  .catch((err) => {
    console.log('DB Connection Error');
  });

