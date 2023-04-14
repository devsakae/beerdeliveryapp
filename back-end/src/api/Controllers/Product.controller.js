const { ProductService } = require('../Services');
// const ErrorNotFound = require('../../middlewares/errors');

const createProduct = async (req, res, next) => {
    try {
        // validateToken(req.headers.authorization);
        const { body } = req;
        const newProduct = await ProductService.createProduct(body);
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

const getAllBySale = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getAllBySale(id);
        if (!product) throw new Error('ProductId not found in Sale_products');
        res.status(200).json(product);
    } catch (error) {
        return next();    
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getAllBySale,
};