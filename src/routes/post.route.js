const express = require("express");
const { list, remove } = require ("../usecases/post.usecase");
const createError = require("http-errors")
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



module.exports = router;

