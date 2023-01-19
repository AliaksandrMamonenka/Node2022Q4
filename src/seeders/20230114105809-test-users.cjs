'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          login: 'Homer',
          password: 'HomerSimpson',
          age: 40,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Bart',
          password: 'BartSimpson',
          age: 15,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Lisa',
          password: 'LisaSimpson',
          age: 16,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
