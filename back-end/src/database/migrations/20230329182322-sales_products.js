'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
        allowNull: false,
      },
      quantity: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  }
};
