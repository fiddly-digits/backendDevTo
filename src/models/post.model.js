const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    minlength: 8,
    required: true
  },
  postBody: {
    type: String,
    minlength: 10,
    required: true
  },
  postImg: {
    type: String,
    match: /^http:\/\/.*\.(jpg|png)$/,
    required: true
  },
  postDate: {
    type: Number,
    required: true
  },
  hashtags: {
    first: {
      type: String,
      match: /^#.*$/,
      required: true
    },
    second: {
      type: String,
      match: /^#.*$/,
      required: true
    },
    third: {
      type: String,
      match: /^#.*$/,
      required: true
    },
    fourth: {
      type: String,
      match: /^#.*$/,
      required: true
    }
  },
  isRelevant: {
    type: Boolean,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  bookmarks: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Posts', postSchema, 'Posts');

// ! Validar si esto es plausible dentro del mismo post, o podemos hacer una relacion a otra db que se llame comments
//   comments: [
//     {
//       content: {
//         type: String,
//       },
//       commenterID: {
//         type: String,
//       }
//     }
//   ]