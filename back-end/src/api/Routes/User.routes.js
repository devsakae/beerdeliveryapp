const { Router } = require('express');
const { UserController } = require('../Controllers');

const route = Router();

route.post(
  '/',
  UserController.Login,
);

module.exports = route;
