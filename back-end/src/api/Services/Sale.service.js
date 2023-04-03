const { Sale } = require('../../database/models');

const getAllSales = async () => Sale.findAll();

const getSaleById = async (id) => Sale.findByPk(id);

const registerSale = async (payload) => Sale.create({ ...payload });

const updateSale = async (id, payload) => Sale.update({ ...payload }, { where: { id } });

const deleteSale = async (id) => Sale.destroy({ where: { id } });

module.exports = { getAllSales, getSaleById, registerSale, updateSale, deleteSale };
