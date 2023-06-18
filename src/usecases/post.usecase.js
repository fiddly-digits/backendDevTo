
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
    return post;
}

// PATCH POST /post/:id

const update = async (id, data) => {
    const post = await Post.findById(id);
    if (data?.hashtags){
    let hashtagsIndex= Object.keys(post.hashtags);
    hashtagsIndex.forEach(hashtag => {
        data.hashtags[hashtag] ? post.hashtags[hashtag] = data.hashtags[hashtag] : 
        data.hashtags[hashtag]= post.hashtags [hashtag]
        })
    }
    const postUpdate= await Post.findByIdAndUpdate(id, data, {returnDocument:"after"}); 
    console.log(data)
    return postUpdate;

} 




module.exports = { list, remove, getOnePost, update }
