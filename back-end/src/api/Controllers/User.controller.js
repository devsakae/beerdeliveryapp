const { UserService } = require('../Services');

const findUserByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserService.findUserByEmail(email);
  return res.status(201).json(user);
};

module.exports = { findUserByEmail };
