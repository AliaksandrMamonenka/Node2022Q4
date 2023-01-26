"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            age: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
        await queryInterface.createTable('group', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            permissions: {
                type: Sequelize.ARRAY(Sequelize.STRING),
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
        await queryInterface.createTable('userGroup', {
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            groupId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'group',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropAllTables();
    },
};
//# sourceMappingURL=20230114090225-init.cjs.map