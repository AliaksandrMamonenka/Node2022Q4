'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ group }) {
      // define association here
      this.belongsToMany(group, {
        through: 'userGroup',
        as: 'groups',
        foreignKey: 'groupId',
      });
    }
  }

  User.init(
    {
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
    },
    {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
    },
  );

  return User;
};
