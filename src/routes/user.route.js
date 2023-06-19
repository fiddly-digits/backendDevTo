const express = require('express');
const router = express.Router();
const { register, get, getOneUser } = require('../usecases/user.usecase.js');

router.post('/', async (req, res) => {
  try {
    const createdUser = await register(req.body);
    res.status(201);
    res.json({
      success: true,
      data: createdUser
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await get();
    res.json({
      success: true,
      data: users
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
