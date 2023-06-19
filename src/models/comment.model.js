const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    commentsFromPostWithIdentifier: {
      type: String,
      required: true,
      unique: true
    },
    comments: [
      {
        content: {
          type: String,
          required: true
        },
        commentDate: {
          type: Number,
          required: true
        },
        commenterID: {
          type: String,
          required: true
        }
      }
    ]
  },
  { _id: false }
);

module.exports = mongoose.model('Comments', commentSchema, 'Comments');

/* 
{
    idPost: 1234,
    comments: [
        {
            content: "Hola muy buen post",
            commentDate: 127391234123000,
            commenterID: 12312324
        },
        {
            content: "Hola muy buen post 2",
            commentDate: 127391234123000,
            commenterID: 12312324
        },
    ]
}

*/
