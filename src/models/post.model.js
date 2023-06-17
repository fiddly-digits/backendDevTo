const mongoose = require ("mongoose");

const postSchema = new mongoose.Schema({
    hashtags:{
        name: String,
        first: String,
        fourth: String,
        second: String,
        third: String
    }
})

module.exports = mongoose.model("posts", postSchema, "Posts");