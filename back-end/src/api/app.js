const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.post('/login', (req, res) => res.status(200).json(req.body));

module.exports = app;
