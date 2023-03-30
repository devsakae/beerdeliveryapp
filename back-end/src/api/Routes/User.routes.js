const { Router } = require('express');
const { UserController } = require('../Controllers');

const route = Router();

route.post(
  '/',
  UserController.findUserByEmail,
);

module.exports = route;
