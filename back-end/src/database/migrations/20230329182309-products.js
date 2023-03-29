'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      price: Sequelize.DECIMAL,
      url_image: Sequelize.STRING,
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};
