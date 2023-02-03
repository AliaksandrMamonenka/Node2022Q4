import db from '../models/index.js';
const DB = db;
class GroupsService {
    async getAllGroups() {
        return await DB.group.findAll();
    }
    async getGroup(id) {
        return await DB.group.findByPk(id);
    }
    async createGroup(item) {
        return await DB.group.create(item, { returning: true });
    }
    async updateGroup(currentGroup) {
        const { id, name, permissions } = currentGroup;
        return await DB.group.update({ name, permissions }, { where: { id }, returning: true });
    }
    async deleteGroup(id) {
        return await DB.group.destroy({ where: { id } });
    }
}
export default new GroupsService();
//# sourceMappingURL=groupService.js.map