const express = require("express");

const { list, remove, getOnePost, update } = require ("../usecases/post.usecase");
const createError = require("http-errors")
const router= express.Router();

//GET POSTS

router.get("/", async (req, res) => {
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

// GET POST BY ID

router.get("/:id", async (req, res) => {
  try {
    const postById = await getOnePost(req.params.id);
    if (!postById) {
      throw createError(404, "The id was not existant"); 
    }
      res.status(200);
    res.json({
      success: true, 
      data: postById
    }) 
  } catch (err) {
    res.status(err.status || 500 );
    res.json({
      success:false, 
      message: "Post not found"
    })
  }
}); 

// DELETE BY ID

router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await remove(req.params.id);
    if (!deletedPost) {
      throw createError(404, "The id was non existant");
    }
    res.json({
      success: true,
      message: `The post #id: ${req.params.id} was deleted`,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: "Post not found",
    });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await update(req.params.id, req.body);
    if (!updatedPost) {
      throw createError(404, "The id was non existant");
    }
    res.json({
      success: true,
      message: updatedPost,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: "Post not found",
    });
  }
});

router.post ("/", async (req, res) => {
  try{
      const newPost = await create(req.body)
      res.status(201);
      res.json({
          success: true,
          data: newPost
      })
  }catch(err) {
      res.status(err.status || 500)
      res.json({
          success: false,
          message: err.message
      })
  }
})



module.exports = router;

