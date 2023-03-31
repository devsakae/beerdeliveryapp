const { Op } = require('sequelize');
const { User } = require('../../database/models');

const findUserByEmail = async (email) => User.findOne({ where: { email } });

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
  // if (!response) throw new Error('CREATE_USER_ERROR');
  return response.id;
};

module.exports = { findUserByEmail, createUser };
