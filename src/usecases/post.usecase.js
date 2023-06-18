
const Post = require("../models/post.model");

//GET POSTS
const list = () => {
    const posts= Post.find();
    return posts ;
}

const remove =(id) =>{
    const post = Post.findByIdAndDelete(id)
    return post
}

module.exports = { list, remove }
