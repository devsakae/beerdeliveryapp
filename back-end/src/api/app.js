const express = require('express');
const cors = require('cors');
const UserRouter = require('./Routes/User.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.post('/login', (req, res) => res.status(200).json(req.body));
app.use(UserRouter);

module.exports = app;
