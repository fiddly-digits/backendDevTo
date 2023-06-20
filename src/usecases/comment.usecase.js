const Comment = require('../models/comment.model');
const createError = require('http-errors');

const create = (postID, userID, data) => {
  data['commentsFromPostWithIdentifier'] = postID;
  data['commenterID'] = userID;
  console.log(data);
  const comment = Comment.create(data);
  return comment;
};

const getFromPost = (postID) => {
  const commentsFromPost = Comment.find({
    commentsFromPostWithIdentifier: postID
  });
  return commentsFromPost;
};

const remove = (commentID, ownerID) => {
  const removedComment = Comment.findOneAndDelete({
    _id: commentID,
    commenterID: ownerID
  });
  return removedComment;
};

const update = (commentID, ownerID, data) => {
  const updatedComment = Comment.findOneAndUpdate(
    {
      _id: commentID,
      commenterID: ownerID
    },
    data,
    { returnDocument: 'after' }
  );
  return updatedComment;
};

module.exports = { create, getFromPost, remove, update };
