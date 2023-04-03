const jwt = require('jsonwebtoken');
require('dotenv/config');
// Como pegar do arquivo .key? A princípio setado para pegar do .env
// const secret = require('../../../jwt.evaluation.key');
const secret = process.env.JWT_SECRET || 'secret_key';

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });
  return token;
};

module.exports = { createToken };