const { Router } = require('express');
const { SaleProController } = require('../Controllers');

const SaleProductRouter = Router();

SaleProductRouter.get('/', SaleProController.getAllSaleProduct);
SaleProductRouter.get('/:id', SaleProController.getSaleProductById);

module.exports = SaleProductRouter;