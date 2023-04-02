const { Router } = require('express');
const { SaleController } = require('../Controllers');

const route = Router();

route.get(
  '/',
  SaleController.getAllSales,
);

route.get(
  '/:id',
  SaleController.getSaleById,
);

route.post(
  '/',
  SaleController.registerSale,
);

route.put(
  '/:id',
  SaleController.updateSale,
);

route.delete(
  '/:id',
  SaleController.deleteSale,
);

module.exports = route;
