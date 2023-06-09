const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');
const { createToken } = require('../Utils/Jwt');

const findUserByEmail = async (userData) => {
  const response = await User.findOne({ where: { email: userData.email } });
  if (!response) throw new Error('USER_NOT_FOUND');
  if (md5(userData.password) !== response.password) throw new Error('INVALID_CREDENTIAL');
  const { id, name, email, role } = response;
  const token = createToken({ id, name, email, role });
  return { id, name, email, role, token };
};

const getUsersSellers = async () => User
.findAll({ where: { role: 'seller' }, attributes: { exclude: ['password'] } });

const getUserById = async (id) => User.find({ id });

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
  // Manipula o objeto de criação para inserir o role padrão, caso não seja especificado
  const newuser = { role: 'customer', ...payload };
  const response = await User.create(newuser);
  const { id, name, email, role } = response;
  const token = createToken({ id, name, email, role });
  return { id, name, email, role, token };
};

const getUsers = async () => User.findAll({ attributes: { exclude: ['password'] } });

module.exports = { findUserByEmail, getUsersSellers, createUser, getUsers, getUserById };
