const jwt = require('../lib/jwt.lib.js');
const createError = require('http-errors');
const Post = require('../models/post.model');

// * Autenticacion de usuario, solamente importar el middleware en donde se necesite
const auth = async (req, res, next) => {
  try {
    console.log('Headers', req.headers);
    const authorization = req.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');
    console.log(token);
    const isVerified = jwt.verify(token);
    console.log(isVerified.id);
    res.locals.postOwner = isVerified.id;
    console.log('Params id', req.params.id);
    if (req.params.id !== undefined) {
      const postbyID = await Post.findById(req.params.id);
      const isIdentical = isVerified.id === postbyID.postOwner;
      if (!isIdentical) {
        throw createError(403, 'You are not the owner of this post');
      }
    }
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = auth;
