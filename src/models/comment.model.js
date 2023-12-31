const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentsFromPostWithIdentifier: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  commenterID: {
    type: String,
    required: true
  }
});

commentSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.__v;
  return obj;
};

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
