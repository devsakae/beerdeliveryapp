const { UserService } = require('../Services');

const findUserByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await UserService.findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'Not found' });
  return res.status(201).json(user);
};

module.exports = { findUserByEmail };
