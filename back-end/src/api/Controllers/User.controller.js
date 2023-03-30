const UserService = require('../Services/User.service');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserService.register({ name, email, password });
  return res.status(201).json(user);
};

module.exports = { register };