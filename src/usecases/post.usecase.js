const Post = require('../models/post.model');

//GET POSTS
const list = () => {
  const posts = Post.find();
  return posts;
};

//GET POST BY ID
const getOnePost = (id) => {
  const postById = Post.findById(id);
  return postById;
};

// DELETE POST
const remove = (id) => {
  const post = Post.findByIdAndDelete(id);
  return post;
};

// PATCH POST /post/:id

const update = async (id, data) => {
  const post = await Post.findById(id);
  if (data?.hashtags) {
    let hashtagsIndex = Object.keys(post.hashtags);
    hashtagsIndex.forEach((hashtag) => {
      data.hashtags[hashtag]
        ? (post.hashtags[hashtag] = data.hashtags[hashtag])
        : (data.hashtags[hashtag] = post.hashtags[hashtag]);
    });
  }
  const postUpdate = await Post.findByIdAndUpdate(id, data, {
    returnDocument: 'after'
  });
  console.log(data);
  return postUpdate;
};

const create = (data, postOwner) => {
  const time = new Date();
  console.log('FECHA UNIX', time);
  const msec = Date.parse(time);
  console.log('fecha parseada ', msec);
  console.log('El Post Owner en el usecase', postOwner);
  data['isRelevant'] = Math.random() < 0.5;
  data['postDate'] = msec;
  data['postOwner'] = postOwner;
  const post = Post.create(data);
  return post;
};

module.exports = { list, remove, getOnePost, update, create };
