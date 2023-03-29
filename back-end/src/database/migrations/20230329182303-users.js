'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: Sequelize.STRING,
      role: Sequelize.STRING,
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};
