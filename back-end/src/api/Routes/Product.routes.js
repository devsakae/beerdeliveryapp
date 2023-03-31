const { Router } = require('express');
const { ProductController } = require('../Controllers');

const route = Router();

route.post('/', ProductController.createProduct);
route.get('/', ProductController.getAllProducts);

module.exports = route;