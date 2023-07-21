const express = require('express');
const {
  create,
  getFromPost,
  remove,
  update
} = require('../usecases/comment.usecase');
const createError = require('http-errors');
const router = express.Router();
const auth = require('../middlewares/auth.middleware.js');

router.post('/', auth, async (req, res) => {
  try {
    const newComment = await create(
      req.query.postID,
      res.locals.owner,
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

//Se hace con Query Params ?postID=${id_del_post_al_que_pertenecen_los_comments}
router.get('/', async (req, res) => {
  try {
    const commentsFromPost = await getFromPost(req.query.postID);
    console.log('Comments from post', commentsFromPost == []);
    res.json({
      success: true,
      data: commentsFromPost
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.delete('/:id', auth, async (req, res) => {
  //check with lenght
  try {
    const removedComment = await remove(req.params.id, res.locals.owner);
    if (!removedComment) {
      throw createError(404, 'You are not the owner of this comment');
    }
    res.json({
      success: true,
      data: removedComment
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const updatedComment = await update(
      req.params.id,
      res.locals.owner,
      req.body
    );
    if (!updatedComment) {
      throw createError(403, 'You are not the owner of this comment');
    }
    res.json({
      success: true,
      data: updatedComment
    });
  } catch (err) {
    res.status(err.status || 500);
    res.json({
      success: false,
      message: err.message
    });
  }
});

//TODO: Modificar el Comment
//TODO: Eliminar el Comment

module.exports = router;
