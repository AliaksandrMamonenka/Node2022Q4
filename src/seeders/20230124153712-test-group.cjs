'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'group',
      [
        {
          name: 'user',
          permissions: ['READ', 'SHARE'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'superUser',
          permissions: ['WRITE', 'UPLOAD_FILES'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'admin',
          permissions: ['DELETE'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('group', null, {});
  },
};
