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

route.get(
  '/:id',
  UserController.getUserById,
);

module.exports = route;
