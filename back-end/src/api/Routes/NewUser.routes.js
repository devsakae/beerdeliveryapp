const { Router } = require('express');
const { UserController } = require('../Controllers');

const NewUserRouter = Router();

NewUserRouter.post(
  '/',
  UserController.createUser,
);

module.exports = NewUserRouter;
