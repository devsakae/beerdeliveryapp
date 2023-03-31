const md5 = require('md5');
const { UserService } = require('../Services');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await UserService.findUserByEmail(email);
    if (!userFound) return res.status(404).json({ message: 'Not found' });
    if (md5(password) !== userFound.password) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.status(200).json('OK');
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
