const express = require('express');
const cors = require('cors');
const { 
  UserRouter,
  NewUserRouter,
  CustomerRouter,
  SaleRouter,
  AdminRouter,
  SaleProductRouter,
} = require('./Routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/images', express.static('./src/images'));

app.get('/coffee', (_req, res) => res.status(418).end());

// Rota de login de usuários
app.use('/login', UserRouter);
// Rota de cadastro de usuários
app.use('/register', NewUserRouter);
// Rota de clientes
app.use('/products', CustomerRouter);
// Rota de vendas
app.use('/sales', SaleRouter);
// Painel de admin
app.use('/admin', AdminRouter);
// Rota sale_products
app.use('/sale_product', SaleProductRouter);

// Middleware de erro (!! pode ser melhor trabalhado em outro arquivo !!)
app.use((error, _req, res, _next) => {
  if (error.message === 'INVALID_CREDENTIAL') return res.status(401).json({ error: error.message });
  if (error.message === 'USER_NOT_FOUND') return res.status(404).json({ error: error.message });
  if (error.message === 'EXISTANT_USER') return res.status(409).json({ error: error.message });
  return res.status(500).json({ error: error.message });
});

module.exports = app;
