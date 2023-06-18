
const Post = require("../models/post.model");

//GET POSTS
const list = () => {
    const posts= Post.find();
    return posts ;
}

//GET POST BY ID
const getOnePost = ( id ) => {
    const postById = Post.findById( id )
    return postById
}

// DELETE POST 
const remove =(id) =>{
    const post = Post.findByIdAndDelete(id)
    return post
}




module.exports = { list, remove, getOnePost }
