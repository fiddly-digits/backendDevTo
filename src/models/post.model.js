const mongoose = require ("mongoose");

const postSchema = new mongoose.Schema({
    postTitle : {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    postBody : {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    }, 
    postImg : {
        type: String,
        minlength: 3,
        maxlength: 20,
        required: true
    },
    postDate : {
        type: Number,
        required: true
    }, 
    hashtags:{
        first : {
            type: String,
            match: /^#.*$/,
            required: true
        },
        second : {
            type: String,
            match: /^#.*$/,
            required: true
        },
        third : {
            type: String,
            match: /^#.*$/,
            required: true
        }, 
        fourth : {
            type: String,
            match: /^#.*$/,
            required: true
        }
    },
    isRelevant: {
        type: Boolean,
        required : true
    },
    likes: {
        // * Este es para medir los likes de cada post del extra
        type: Number,
        required: true
      },
      bookmarks: {
        // * Este es para medir los favs de cada post del extra
        type: Number,
        required: true
      },
      postOwner: {
        // * el id del autor del post
        type: String,
        required: true
      }

    

})


module.exports = mongoose.model('Posts', postSchema, 'Posts');