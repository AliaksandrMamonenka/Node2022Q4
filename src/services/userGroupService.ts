import db from '../models/index.js';
import { BadRequestError } from '../utils/apiErrorHandler.js';

const DB: any = db;

class UserGroupService {
  async addUsersToGroup(groupId: string, userId: string) {
    const transaction = await DB.sequelize.transaction();

    const { id: group } = await DB.group.findByPk(groupId, { raw: true });
    const { id: user } = await DB.user.findByPk(userId, { raw: true });

    if (group && user) {
      const result = await DB.userGroup.create({ groupId: group, userId: user }, { transaction });
      await transaction.commit();
      return result;
    } else {
      await transaction.rollback();
      throw new BadRequestError('Put valid group or user ids');
    }
  }
}

export default new UserGroupService();
