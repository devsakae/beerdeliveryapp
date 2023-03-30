const express = require('express');
const UserController = require('../Controllers/User.controller');
// const loginController = require('../Controllers/loginController');

const UserRouter = express.Router();

// UserRouter.post('/login', (req, res) => res.send(200));
UserRouter.post('/register', UserController.register);

module.exports = UserRouter;