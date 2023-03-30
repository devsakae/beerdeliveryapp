const UserModel = require('../../database/models/User');

const findUserByEmail = async (email) => {
  console.log(email);
  const user = await UserModel.findOne({
    where: { email },
  });
  console.log(user);
  return user;
};

module.exports = { findUserByEmail };