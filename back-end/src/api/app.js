const express = require('express');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.post('/login', (req, res) => res.status(200).json(req.body));

module.exports = app;
