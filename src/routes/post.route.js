const express = require("express");
const app= express()
const {list, getById, create, erase} = require("../usecases/post.usercase");

const router = express.Router();


router.get("/", async (req, res)=>{
    try {
        const posts = await list();
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
        if (!post){
            const error = new error ("Post not found");
            error.status = 404;
            throw error;    
        }
        const post = await getById (req.params.id)
        res.json({
            success: true,
            data: post
        })

    }catch (err){
        res.status(err.status || 500);
        res.json({
            success: false,
            message: err.message
        })    
    }
})

router.post ("/", async(req, res) => {
    try {
        const post = await create(req.body)
        res.status(201);
        res.json ({
            success:true,
            data: post  
        })

    }catch(err){
        res.status(err.status || 500)
        res.json({
            success:false,
            message: err.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const post = await erase(req.params.id)
        res.json({
            success:true, 
            data: post,
            message: `El post ${req.params.id} ha sido eliminado`
            
        })
    }catch(err){
    res.status(err.status || 500)
    res.json({
        success:false,
        message: err.message
    })
    }      
})

module.exports = router;