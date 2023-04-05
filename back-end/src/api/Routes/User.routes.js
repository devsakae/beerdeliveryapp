const { Router } = require('express');
const { UserController } = require('../Controllers');

const route = Router();

route.post(
  '/',
  UserController.Login,
);

route.get(
  '/role',
  UserController.getUsersSellers,
);

module.exports = route;
