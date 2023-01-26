'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class UserGroup extends Model {}
  UserGroup.init(
    {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      groupId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'userGroup',
      freezeTableName: true,
    },
  );

  return UserGroup;
};
