const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      minlength: 3,
      maxlength: 10,
      required: true
    },
    last: {
      type: String,
      minlength: 3,
      maxlength: 10,
      required: true
    }
  },
  location: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  joined: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 20
  },
  login: {
    email: {
      type: String,
      match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Users', userSchema, 'Users');
