import db from '../models/index.js';
const DB = db;
class UserGroupService {
    async addUsersToGroup(groupId, userIds) {
        const transaction = await DB.sequelize.transaction();
        try {
            const group = await DB.group.findByPk(groupId);
            const user = await DB.user.findByPk(userIds);
            if (group && user) {
                await DB.userGroup.create({ groupId, userIds }, { transaction });
                await transaction.commit();
            }
            else {
                throw new Error('put valid group or user ids');
            }
        }
        catch (error) {
            await transaction.rollback();
        }
    }
}
export default new UserGroupService();
//# sourceMappingURL=userGroupService.js.map