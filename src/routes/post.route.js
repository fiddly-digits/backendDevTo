const express = require("express");
const app= express()
const {list, getById, create, remove} = require("../usecases/post.usercase");
const createError = require("http-errors")

const router = express.Router();

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