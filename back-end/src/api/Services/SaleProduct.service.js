const { SaleProduct } = require('../../database/models');

const getAllSaleProduct = async () => {
    const saleProduct = await SaleProduct.findAll();
    return saleProduct;
};

const getSaleProductById = async (saleId) => {
    const saleProduct = await SaleProduct.findAll({ where: { saleId } });
    return saleProduct;
};

module.exports = {
    getAllSaleProduct,
    getSaleProductById,
};