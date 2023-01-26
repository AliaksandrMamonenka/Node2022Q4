import db from '../models/index.js';

const DB: any = db;

class UserGroupService {
  async addUsersToGroup(groupId: string, userId: string) {
    const transaction = await DB.sequelize.transaction();

    try {
      const group = await DB.group.findByPk(groupId);
      const user = await DB.user.findByPk(userId);

      if (group && user) {
        const result = await DB.userGroup.create({ groupId, userId }, { transaction });
        await transaction.commit();
        return result;
      } else {
        throw new Error('put valid group or user ids');
      }
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return error;
    }
  }
}

export default new UserGroupService();
