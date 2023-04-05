const { Router } = require('express');
const { ProductController } = require('../Controllers');

const CustomerRouter = Router();

CustomerRouter.get('/', ProductController.getAllProducts);
CustomerRouter.post('/', ProductController.createProduct);
CustomerRouter.get('/sale/:id', ProductController.getAllBySale);

module.exports = CustomerRouter;