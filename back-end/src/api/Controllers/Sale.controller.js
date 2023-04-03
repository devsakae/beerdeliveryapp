const { SaleService } = require('../Services');

const getAllSales = async (_req, res, next) => {
  try {
    const dataValues = await SaleService.getAllSales();
    return res.status(200).json(dataValues);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { params: { id } } = req;
    const { dataValues } = await SaleService.getSaleById(id);
    return res.status(200).json(dataValues);
  } catch (error) {
    next(error);
  }
};

const registerSale = async (req, res, next) => {
  try {
    const { dataValues } = await SaleService.registerSale(req.body);
    return res.status(201).json(dataValues);
  } catch (error) {
    next(error);
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
    next(error);
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
    next(error);
  }
};

module.exports = { getAllSales, getSaleById, registerSale, updateSale, deleteSale };
