const express = require("express");
const app= express()
const {list, getById} = require("../usecases/post.usercase");

const router = express.Router();


router.get("/", async (req, res)=>{
    try {
        const posts = await list();
        console.log("posts", posts)
        res.json({
            success: true,
            data:posts 
        }) 
    }catch (err){
        res.status(400);
        res.json({
            success:false,
            message: err.message
        })
    }
})

router.get("/:id", async (req, res)=>{
    try {
        const post = await getById (req.params.id)
        res.json({
            success: true,
            data: post
        })

    }catch (err){
        res.json({
            success: false,
            message: err.message
        })    
    }
})

module.exports = router;