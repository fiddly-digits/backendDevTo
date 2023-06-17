const Post = require("../models/post.model");

const list = () => {
    const post = Post.find();
    return post;
}

const getById = (id) =>{
    const post = Post.findById(id)
    return post;
}

const create =(data)=> {
    const post = Post.create(data)
    return post
}

const erase =(id) =>{
    const post = Post.findByIdAndDelete(id)
    return post
}

module.exports = {list, getById, create, erase}