const express = require('express');

const app = express();

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.post('/login', (_req, res) => res.send(200));

module.exports = app;
