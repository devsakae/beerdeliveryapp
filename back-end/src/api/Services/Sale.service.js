const { Sale } = require('../../database/models');

const getAllSales = async () => Sale.findAll();

const getOrdersByUserId = async (id) => Sale.findAll({ where: { userId: id } });

const getSaleById = async (id) => Sale.findByPk(id);

const registerSale = async (payload) => Sale.create({ ...payload });

const updateSale = async (id, payload) => Sale.update({ ...payload }, { where: { id } });

const deleteSale = async (id) => Sale.destroy({ where: { id } });

module.exports = {
  getAllSales, getOrdersByUserId, getSaleById, registerSale, updateSale, deleteSale };
