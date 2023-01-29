'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      // define association here
      this.belongsToMany(user, {
        through: 'userGroup',
      });
    }
  }

  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'group',
      freezeTableName: true,
    },
  );

  return Group;
};
