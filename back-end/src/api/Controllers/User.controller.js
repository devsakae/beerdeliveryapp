const md5 = require('md5');
const { UserService } = require('../Services');
const { validateToken } = require('../Utils/Jwt');

const hashPassword = (data) => md5(data);

const Login = async (req, res, next) => {
  try {
    const response = await UserService.findUserByEmail(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

const getUsersSellers = async (_req, res, next) => {
  try {
    const users = await UserService.getUsersSellers();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.getUserById(id);
    return res.status(200).json(response);  
  } catch (error) {
    return next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const password = hashPassword(req.body.password);
    const { name, email } = req.body;
    const payload = { name, email, password };
    const user = await UserService.createUser(payload);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

const addNewUser = async (req, res, next) => {
  try {
    validateToken(req.headers.authorization);
    const password = hashPassword(req.body.password);
    const payload = { ...req.body, password };
    const user = await UserService.createUser(payload);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    validateToken(req.headers.authorization);
    const response = await UserService.getUsers();
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
}

module.exports = { Login, getUsersSellers, createUser, addNewUser, getUsers, getUserById };
