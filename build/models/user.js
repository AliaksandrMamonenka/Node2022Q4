'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate({ group }) {
            this.belongsToMany(group, {
                through: 'userGroup',
                as: 'groups',
                foreignKey: 'groupId',
            });
        }
    }
    User.init({
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
    });
    return User;
};
//# sourceMappingURL=user.js.map