const express = require('express');
const cors = require('cors');
const { UserRouter, NewUserRouter, CustomerRouter } = require('./Routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/images', express.static('./src/images'));

app.get('/coffee', (_req, res) => res.status(418).end());

// Rota de login de usuários
app.use('/login', UserRouter);
// Rota de cadastro de usuários
app.use('/register', NewUserRouter);
// Rota de customers
app.use('/customer', CustomerRouter);

// Middleware de erro (!! pode ser melhor trabalhado em outro arquivo !!)
app.use((error, _req, res, _next) => {
  if (error.message === 'EXISTANT_USER') return res.send(409);
  return res.status(500).json({ error: error.message });
});

module.exports = app;
