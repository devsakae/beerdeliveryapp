const { Product, sequelize } = require('../../database/models');
// const ErrorNotFound = require('../../middlewares/errors');

const createProduct = async (body) => {
  const newProduct = await Product.create(body);
  return newProduct;
};

const getAllProducts = async () => {
  const products = await Product.findAll();
  if (!products || products.length === 0) throw new Error(); 
  return products;
};

const getAllBySale = async (id) => {
  const query = `SELECT name, price, sp.quantity, (price * sp.quantity) as sub_total
  from products as p
  JOIN sales_products as sp 
  ON sp.sale_id = ${id}
  WHERE sp.product_id = p.id 
  GROUP BY p.id`;
  const products = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });
  return products;
};

module.exports = {
  createProduct,
  getAllProducts,
  getAllBySale,
};