const jwt = require('jsonwebtoken');
require('dotenv/config');
// Como pegar do arquivo .key? A princípio setado para pegar do .env
// const secret = require('../../../jwt.evaluation.key');
const jwtKey = process.env.JWT_SECRET || 'secret_key';
// const jwtKey = require("fs")
//   .readFileSync("./back-end/jwt.evaluation.key", { encoding: "utf-8" });

const createToken = (payload) => {
  const token = jwt.sign(payload, jwtKey, { algorithm: 'HS256', expiresIn: '7d' });
  return token;
};

module.exports = { createToken };