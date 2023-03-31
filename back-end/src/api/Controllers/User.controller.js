const md5 = require('md5');
const { UserService } = require('../Services');

const findUserByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserService.findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'Not found' });
  return res.status(201).json(user);
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

module.exports = { findUserByEmail, createUser };
