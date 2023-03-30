const { scryptSync } = require('crypto');
const { UserService } = require('../Services');

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await UserService.findUserByEmail(email);
    if (!userFound) return res.status(404).json({ message: 'Not found' });
    scryptSync(password, userFound.password, 64); // Guilherme tentando entender como funciona 😵‍💫
    return res.status(201).json(userFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { Login };
