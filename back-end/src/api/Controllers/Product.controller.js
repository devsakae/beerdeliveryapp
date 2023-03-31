const { ProductService } = require('../Services');
// const ErrorNotFound = require('../../middlewares/errors');

const createProduct = async (req, res, next) => {
    try {
        const { body } = req;
        const newProduct = await ProductService.createProduct(body);
        if (!newProduct) return res.status(404).json({ message: 'Not Found' });
        return res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
};

const getAllProducts = async (req, res, next) => {
   try {
    const products = await ProductService.getAllProducts();
    if (!products) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(products);
   } catch (error) {
    next(error);
   }
};

module.exports = {
    createProduct,
    getAllProducts,
};