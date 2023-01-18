import { DataTypes } from 'sequelize';
import { sequelize } from '../data-access/index.js';
import User from '../db_migration/models/user.js';
const user = User(sequelize, DataTypes);
class UsersService {
    getAllUsers(query) {
        return user.findAll();
    }
    getUser(id) {
        return user.findByPk(id);
    }
    createUser(data) {
        return user.create(data);
    }
}
export default new UsersService();
//# sourceMappingURL=userService.js.map