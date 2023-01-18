import { DataTypes, Op } from 'sequelize';

import { sequelize } from '../data-access/index.js';
import User from '../db_migration/models/user.js';
import { UserType } from '../types/userType.js';

const user = User(sequelize, DataTypes);
class UsersService {
  async getAllUsers(query: any) {
    const { login, limit }: any = query;
    let queryString: any = {
      where: {
        isDeleted: false,
      },
    };

    if (limit) {
      queryString = { ...queryString, limit };
    }

    if (login) {
      queryString.where = { ...queryString.where, login: { [Op.like]: `%${login}%` } };
    }

    return await user.findAll(queryString);
  }

  async getUser(id: string) {
    return await user.findByPk(id);
  }

  async createUser(item: UserType) {
    return await user.create(item, { returning: true });
  }

  async updateUser(currentUser: UserType) {
    const { login, password, age, id, isDeleted } = currentUser;

    return await user.update({ login, password, age, isDeleted }, { where: { id }, returning: true });
  }

  async deleteUser(id: string) {
    return await user.update({ isDeleted: true }, { where: { id } });
  }
}

export default new UsersService();
