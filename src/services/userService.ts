import { Op } from 'sequelize';

import db from '../models/index.js';
import { UserType } from '../types/userType.js';

const DB: any = db;

class UsersService {
  async getAllUsers(query: any) {
    const { login, limit }: any = query;
    let queryString: any = {};

    if (limit) {
      queryString = { ...queryString, limit };
    }

    if (login) {
      queryString.where = { ...queryString.where, login: { [Op.like]: `%${login}%` } };
    }

    return await DB.user.findAll(queryString);
  }

  async getUser(id: string) {
    return await DB.user.findByPk(id);
  }

  async createUser(item: UserType) {
    return await DB.user.create(item, { returning: true });
  }

  async updateUser(currentUser: UserType) {
    const { login, password, age, id } = currentUser;
    return await DB.user.update({ login, password, age }, { where: { id }, returning: true });
  }

  async deleteUser(id: string) {
    return await DB.user.destroy({ where: { id }, returning: true });
  }
}

export default new UsersService();
