// const { QueryTypes } = require('sequelize');
// // const ErrorNotFound = require('../../middlewares/errors');
// const { sequelize } = require('../../database/models/index');

const { SaleProduct } = require('../../database/models');

// const getOrderItems = `
//   SELECT
//     s.id as id,
//     vendor.name as seller,
//     s.sale_date as saleDate,
//     s.status as status,
//     s.total_price as total,
//     p.name as name,
//     p.price as price,
//     sp.quantity as quantity,
//     (p.price * sp.quantity) as subtotal
//   FROM \`delivery-app-dev\`.sales_products sp
//   INNER JOIN \`delivery-app-dev\`.products p ON p.id = sp.product_id
//   INNER JOIN \`delivery-app-dev\`.sales s ON s.id  = sp.sale_id
//   INNER JOIN \`delivery-app-dev\`.users vendor ON vendor.id  = s.seller_id
//   WHERE s.id = ?
// `;

// const getOrderItemsBySaleId = async (id) => {
//   const orderItems = sequelize.query(
//     getOrderItems,
//     { raw: true, type: QueryTypes.SELECT, replacements: [id] },
//   );

//   return orderItems;
// };

const createSaleProducts = async (payload) => {
  console.log('cheguei');
  const response = await SaleProduct.create({ ...payload });
  console.log('response:', response);
  return response;
};

module.exports = {
  // getOrderItemsBySaleId,
  createSaleProducts,
};