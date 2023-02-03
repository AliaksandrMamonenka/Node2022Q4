'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('group', [
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
        ], {});
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('group', null, {});
    },
};
//# sourceMappingURL=20230124153712-test-group.cjs.map