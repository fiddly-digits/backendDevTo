const Post = require("../models/post.model");


const remove =(id) =>{
    const post = Post.findByIdAndDelete(id)
    return post
}

module.exports = {remove}