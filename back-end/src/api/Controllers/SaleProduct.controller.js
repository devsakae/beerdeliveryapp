const { SaleProService } = require('../Services');

const getAllSaleProduct = async (_req, res, next) => {
    try {
        const saleProduct = await SaleProService.getAllSaleProduct();
        res.status(200).json(saleProduct);
    } catch (error) {
        return next(error);
    }
};

const getSaleProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const saleProduct = await SaleProService.getSaleProductById(id);
        return res.status(200).json(saleProduct);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllSaleProduct,
    getSaleProductById,
};