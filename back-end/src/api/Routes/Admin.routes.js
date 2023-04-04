const { Router } = require('express');
const { UserController } = require('../Controllers');

const AdminRouter = Router();

AdminRouter.post('/newuser', UserController.addNewUser);

module.exports = AdminRouter;