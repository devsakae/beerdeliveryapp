'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        name: 'Beer Delivery App Admin',
        email: 'admin@beerdeliveryapp.com',
        password: 'c1399975f4b4fed4305d2e0aaf291a40',
        // senha: md5('p@ssw0rd_@dm1n')
        role: 'administrator',
      },
      {
        id: 2,
        name: 'Quiosque do Shopping',
        email: 'quiosque@beerdeliveryapp.com',
        password: '214ebc26481ad573e71582661472444a',
        // senha: md5('ilovebeer')
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Pé Dagua',
        email: 'pedagua@email.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        // senha: md5('123456')
        role: 'customer',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
