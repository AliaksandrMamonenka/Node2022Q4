'use strict';
import { Model } from 'sequelize';
export default (sequelize) => {
  class UserGroup extends Model {}
  UserGroup.init(
    {},
    {
      sequelize,
      modelName: 'userGroup',
      freezeTableName: true,
    },
  );

  return UserGroup;
};
