const { Router } = require('express');
const { SaleProductController } = require('../Controllers');

const route = Router();

route.get(
  '/:id',
  SaleProductController.getOrderItemsById,
);

module.exports = route;
