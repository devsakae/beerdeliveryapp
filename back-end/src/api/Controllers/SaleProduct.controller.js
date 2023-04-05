const { getOrderItemsBySaleId } = require('../Services/SaleProduct.service');

const getOrderItemsById = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const dataValues = await getOrderItemsBySaleId(+id);
    return res.status(200).json(dataValues);
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrderItemsById };
