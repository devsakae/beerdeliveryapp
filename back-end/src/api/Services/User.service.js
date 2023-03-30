const { User } = require('../../database/models');

const findUserByEmail = async (email) => User.findOne({ where: { email } });

module.exports = { findUserByEmail };
