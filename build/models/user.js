'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate() {
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
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
    });
    return User;
};
//# sourceMappingURL=user.js.map