const { Router } = require('express');
const { ProductController } = require('../Controllers');

const CustomerRouter = Router();

CustomerRouter.get('/', ProductController.getAllProducts);
CustomerRouter.post('/', ProductController.createProduct);

module.exports = CustomerRouter;