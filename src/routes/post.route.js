const express = require("express");
const { list } = require ("../usecases/post.usecase");

const router= express.Router();

//GET POSTS

router.get ("/", async (req, res) => {
    try{
        const posts=await list();
        res.json({
            success: true,
            data: posts
        })
    } catch(err){
        res.status(400);
        res.json ({
            success: false,
            message: err.message
        })
    }
})





module.exports = router;
