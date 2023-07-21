const Post = require('../models/post.model');
const createError = require('http-errors');

//GET POSTS
const list = (queryToSearch) => {
  let posts = {};
  if (!queryToSearch) {
    posts = Post.find();
  } else {
    posts = Post.find({
      $or: [
        { postBody: new RegExp(queryToSearch, 'i') },
        { postTitle: new RegExp(queryToSearch, 'i') }
      ]
    });
  }
  return posts;
};

//GET POST BY ID
const getOnePost = (id) => {
  const postById = Post.findById(id);
  return postById;
};

// DELETE POST
const remove = async (postID, ownerID) => {
  const post = await Post.findById(postID);
  const isIdentical = post.postOwner === ownerID;
  if (!isIdentical) {
    throw createError(403, 'You are not the owner of this post');
  }
  const postDeleted = Post.findByIdAndDelete(postID);
  return postDeleted;
};

// PATCH POST /post/:id

const update = async (postID, data, ownerID) => {
  const post = await Post.findById(postID);
  console.log('Data del Update', data);
  const isIdentical = post.postOwner === ownerID;
  let isLikesOrBookmarks =
    Object.keys(data)[0] === 'likes' || Object.keys(data)[0] === 'bookmarks';
  if (!isLikesOrBookmarks) {
    if (isIdentical) {
      if (data?.hashtags) {
        let hashtagsIndex = Object.keys(post.hashtags);
        hashtagsIndex.forEach((hashtag) => {
          data.hashtags[hashtag]
            ? (post.hashtags[hashtag] = data.hashtags[hashtag])
            : (data.hashtags[hashtag] = post.hashtags[hashtag]);
        });
      }
    } else {
      throw createError(403, 'You are not the owner of this post');
    }
  }
  const postUpdate = await Post.findByIdAndUpdate(postID, data, {
    returnDocument: 'after'
  });
  return postUpdate;
};

const create = (data, postOwner) => {
  const time = new Date();
  const msec = Date.parse(time);
  data['isRelevant'] = Math.random() < 0.5;
  data['likes'] = 0;
  data['bookmarks'] = 0;
  data['postDate'] = msec;
  data['postOwner'] = postOwner;
  const post = Post.create(data);
  return post;
};

module.exports = { list, remove, getOnePost, update, create };
