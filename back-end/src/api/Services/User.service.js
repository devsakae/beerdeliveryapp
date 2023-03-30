const UserModel = require('../../database/models/User.model');

const register = async (user) => {
  // const newUser = await UserModel.create(user);
  // return newUser;
  return user;
};

module.exports = { register };