import { Op } from 'sequelize';
import db from '../models/index.js';
const DB = db;
class UsersService {
    async getAllUsers(query) {
        const { login, limit } = query;
        let queryString = {};
        if (limit) {
            queryString = { ...queryString, limit };
        }
        if (login) {
            queryString.where = { ...queryString.where, login: { [Op.like]: `%${login}%` } };
        }
        return await DB.user.findAll(queryString);
    }
    async getUser(id) {
        return await DB.user.findByPk(id);
    }
    async createUser(item) {
        return await DB.user.create(item, { returning: true });
    }
    async updateUser(currentUser) {
        const { login, password, age, id } = currentUser;
        return await DB.user.update({ login, password, age }, { where: { id }, returning: true });
    }
    async deleteUser(id) {
        return await DB.user.destroy({ where: { id }, returning: true });
    }
}
export default new UsersService();
//# sourceMappingURL=userService.js.map