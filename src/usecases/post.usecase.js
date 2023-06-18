const { default: mongoose } = require("mongoose");
const Post = require("../models/post.model");

//GET POSTS
const list = () => {
    const posts= Post.find();
    return posts ;
}



module.exports = { list }