import db from '../models/index.js';

const DB: any = db;

class UserGroupService {
  async addUsersToGroup(groupId: string, userId: string) {
    const transaction = await DB.sequelize.transaction();

    try {
      const { id: group } = await DB.group.findByPk(groupId, { raw: true });
      const { id: user } = await DB.user.findByPk(userId, { raw: true });

      if (group && user) {
        const result = await DB.userGroup.create({ groupId: group, userId: user }, { transaction });
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
