import { Op } from 'sequelize';

import db from '../models/index.js';
import { UserType } from '../types/userType.js';
import ApiErrorHandler from '../utils/apiErrorHandler.js';
import TokenService from './tokenService.js';

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

  async login(userName: string, password: string) {
    const user = await DB.user.findOne({ where: { login: userName } }, { raw: true });
    const { login, password: userPassword } = user?.dataValues;

    if (!login) {
      throw ApiErrorHandler.BadRequestError('User does not exist');
    }

    if (password !== userPassword) {
      throw ApiErrorHandler.BadRequestError('Password is not valid');
    }

    const token = TokenService.generateToken({ login, password });
    return { ...token, user: { login, password } };
  }
}

export default new UsersService();
