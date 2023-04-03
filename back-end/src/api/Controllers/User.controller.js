const md5 = require('md5');
const { UserService } = require('../Services');

const Login = async (req, res) => {
  try {
    const response = await UserService.findUserByEmail(req.body);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const password = md5(req.body.password);
    const payload = { ...req.body, password };
    const user = await UserService.createUser(payload);
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { Login, createUser };
