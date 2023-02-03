'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
    class Group extends Model {
        static associate({ user }) {
            this.belongsToMany(user, {
                through: 'userGroup',
            });
        }
    }
    Group.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'group',
        freezeTableName: true,
    });
    return Group;
};
//# sourceMappingURL=group.js.map