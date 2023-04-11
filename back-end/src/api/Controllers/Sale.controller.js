const { validateToken } = require('../Utils/Jwt');
const { SaleService, SaleProductService } = require('../Services');

const getAllSales = async (_req, res, next) => {
  try {
    const dataValues = await SaleService.getAllSales();
    return res.status(200).json(dataValues);
  } catch (error) {
    return next(error);
  }
};

const getOrdersByUserId = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const dataValues = await SaleService.getOrdersByUserId(id);
    return res.status(200).json(dataValues);
  } catch (error) {
    return next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const { dataValues } = await SaleService.getSaleById(id);
    return res.status(200).json(dataValues);
  } catch (error) {
    return next(error);
  }
};

const registerSale = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    const { id: userId } = validateToken(authorization);
    const { payload, saleProducts } = req.body;
    const newPayload = { ...payload, userId };
    const { id } = await SaleService.registerSale(newPayload);
    saleProducts.forEach(async (prod) => {
      await SaleProductService.createSaleProducts({
        saleId: id,
        ...prod,
      });
    });
    return res.status(201).json(id);
  } catch (error) {
    return next(error);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { body, params: { id } } = req;
    await SaleService.updateSale(id, body);
    const { dataValues } = await SaleService.getSaleById(id);
    return res.status(201).json({
      message: `sale with id ${id} updated successfully`, ...dataValues,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const { dataValues } = await SaleService.getSaleById(id);
    await SaleService.deleteSale(id);
    return res.status(200).json({
      message: 'successfully deleted sale', ...dataValues,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllSales, getOrdersByUserId, getSaleById, registerSale, updateSale, deleteSale };
