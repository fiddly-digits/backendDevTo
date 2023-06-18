const jwt = require('../lib/jwt.lib.js');

// * Autenticacion de usuario, solamente importar el middleware en donde se necesite
const auth = (req, res, next) => {
  try {
    console.log('Headers', req.headers);
    const authorization = req.headers.authorization || '';
    const token = authorization.replace('Bearer ', '');
    console.log(token);
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = auth;
