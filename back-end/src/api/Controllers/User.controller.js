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

module.exports = { Login };
