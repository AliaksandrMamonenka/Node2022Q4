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
          age: 36,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Bart',
          password: 'BartSimpson',
          age: 10,
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Lisa',
          password: 'LisaSimpson',
          age: 8,
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
