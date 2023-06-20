const express = require('express');
const { create } = require('../usecases/comment.usecase');
const createError = require('http-errors');
const router = express.Router();
const auth = require('../middlewares/auth.middleware.js');

router.post('/', auth, async (req, res) => {
  try {
    console.log(req.params);
    const newComment = await create(
      req.query.postID,
      res.locals.postOwner,
      req.body
    );
    res.status(201);
    res.json({
      success: true,
      data: newComment
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
