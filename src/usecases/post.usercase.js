const Post = require("../models/post.model");

const list = () => {
    const post = Post.find();
    return post;
}

const getById = (id) =>{
    const post = Post.findById(id)
    return post;
}

module.exports = {list, getById}