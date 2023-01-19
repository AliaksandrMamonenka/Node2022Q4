import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../data-access/index.js';
import User from '../models/user.js';
const user = User(sequelize, DataTypes);
class UsersService {
    async getAllUsers(query) {
        const { login, limit } = query;
        let queryString = {
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
    async getUser(id) {
        return await user.findByPk(id);
    }
    async createUser(item) {
        return await user.create(item, { returning: true });
    }
    async updateUser(currentUser) {
        const { login, password, age, id, isDeleted } = currentUser;
        return await user.update({ login, password, age, isDeleted }, { where: { id }, returning: true });
    }
    async deleteUser(id) {
        return await user.update({ isDeleted: true }, { where: { id } });
    }
}
export default new UsersService();
//# sourceMappingURL=userService.js.map