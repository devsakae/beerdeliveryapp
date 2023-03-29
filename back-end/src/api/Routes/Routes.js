const express = require('express');

// const loginController = require('../Controllers/loginController');

const router = express.Router();

router.post('/login', (req, res) => res.send(200));

module.exports = router;