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
    console.log('id:', id);
    await SaleProductService.createSaleProducts({
      saleId: 1,
      productId: 2,
      quantity: 3,
    });
    // saleProducts.forEach(async (prod) => {
    //   console.log('item:', prod);
      // await SaleProductService.createSaleProducts({
      //   saleId: id,
      //   ...prod,
      // });
    // });
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

module.exports = { getAllSales, getSaleById, registerSale, updateSale, deleteSale };
