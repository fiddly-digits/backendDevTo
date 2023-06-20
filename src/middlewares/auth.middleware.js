const jwt = require('../lib/jwt.lib.js');

// * Autenticacion de usuario, solamente importar el middleware en donde se necesite
const auth = async (req, res, next) => {
  try {
    //console.log('Headers', req.headers);
    const authorization = req.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');
    const isVerified = jwt.verify(token);
    console.log('verified ID', isVerified.id);
    res.locals.postOwner = isVerified.id;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = auth;

/* 

const auth = async (req, res, next) => {
  try {
    console.log('Headers', req.headers);
    const authorization = req.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');
    console.log(token);
    const isVerified = jwt.verify(token);
    console.log(isVerified.id);
    res.locals.postOwner = isVerified.id;
    let isLikesOrBookmarks =
      Object.keys(req.body)[0] === 'likes' ||
      Object.keys(req.body)[0] === 'bookmarks';
    console.log(req.body);
    console.log(req.params.id);
    if (!isLikesOrBookmarks) {
      if (req.params.id !== undefined) {
        const postbyID = await Post.findById(req.params.id);
        const isIdentical = isVerified.id === postbyID.postOwner;
        console.log('es identico?', isIdentical);
        if (!isIdentical) {
          throw createError(403, 'You are not the owner of this post');
        }
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


*/
