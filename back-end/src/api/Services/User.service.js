const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const { createToken } = require('../Utils/Jwt');

const findUserByEmail = async (userData) => {
  const response = await User.findOne({ where: { email: userData.email } });
  if (!response) throw new Error('USER_NOT_FOUND');
  if (md5(userData.password) !== response.password) throw new Error('INVALID_CREDENTIALS');
  const { id, name, email, role } = response;
  const token = createToken({ id, name, email, role });
  return { name, email, role, token };
};

const createUser = async (payload) => {
  // Verifica se usuário já existe (nome e email - req 10)
  const check = await User.findOne({
    where: {
      [Op.or]: [
        { email: payload.email },
        { name: payload.name },
      ],
    },
  });
  if (check) throw new Error('EXISTANT_USER');
  // Manipula o objeto de criação para inserir o role padrão
  const newuser = { ...payload, role: 'customer' };
  const response = await User.create(newuser);
  const { id, name, email, role } = response;
  const token = createToken({ id, name, email, role });
  return { name, email, role, token };
};

module.exports = { findUserByEmail, createUser };
