const { Product } = require('../../database/models');
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

module.exports = {
  createProduct,
  getAllProducts,
};