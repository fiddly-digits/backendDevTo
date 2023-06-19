const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/user.model.js');
const jwt = require('../lib/jwt.lib.js');

const register = async (data) => {
  console.log(data.login.password);
  // TODO: Fragmenta este regex, para ir pidiendo validacion uno a uno y mandar errores distintos.
  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z])(?=.{10,})/.test(
      data.login.password
    )
  ) {
    throw createError(400, "Password doesn't meet requirements"); // ! Validar http pensando en que podria ser 406
  }
  const hashedPassword = await bcrypt.hash(data.login.password, 10);
  data.login.password = hashedPassword;

  const time = new Date();
  const msec = Date.parse(time);
  data['joined'] = msec;

  const user = await User.create(data);
  return user;
};

const login = async (email, plainPassword) => {
  const user = await User.findOne({ 'login.email': email });
  console.log('USER:', user.login.email);
  if (!user) {
    throw createError(400, 'Invalid Data');
  }
  const isValidPassword = await bcrypt.compare(
    plainPassword,
    user.login.password
  );
  console.log('IsValidPassword', isValidPassword);
  if (!isValidPassword) {
    throw createError(400, 'Invalid Data');
  }
  const token = jwt.sign({ id: user._id });
  return token;
};

const get = async () => {
  const users = await User.find();
  return users;
};

const getOneUser = async (id) => {
  const user = await User.findOne(id);
  return user;
};

module.exports = { register, login, get, getOneUser };
