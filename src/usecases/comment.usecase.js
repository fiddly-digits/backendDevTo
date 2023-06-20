const Comment = require('../models/comment.model');
const createError = require('http-errors');

const create = (postID, userID, data) => {
  data['commentsFromPostWithIdentifier'] = postID;
  data['commenterID'] = userID;
  console.log(data);
  const post = Comment.create(data);
  return post;
};

module.exports = { create };
