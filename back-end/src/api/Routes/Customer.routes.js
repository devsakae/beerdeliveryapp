const { Router } = require('express');
const { ProductController } = require('../Controllers');

const CustomerRouter = Router();

CustomerRouter.get('/products', ProductController.getAllProducts);
CustomerRouter.post('/products', ProductController.createProduct);

module.exports = CustomerRouter;