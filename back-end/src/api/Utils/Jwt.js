const jwt = require('jsonwebtoken');
require('dotenv/config');

// const jwtKey = process.env.JWT_SECRET || 'secret_key';
const fs = require('fs');
const path = require('path');

const getKey = path.join(__dirname, '..', '..', '..', 'jwt.evaluation.key');
const jwtKey = () => {
  const data = fs.readFileSync(getKey, 'utf-8');
  return data;
};
const myKey = jwtKey();

const createToken = (payload) => {
  const token = jwt.sign(payload, myKey, { algorithm: 'HS256', expiresIn: '7d' });
  return token;
};

module.exports = { createToken };