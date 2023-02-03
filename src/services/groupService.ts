import db from '../models/index.js';

import { GroupType } from '../types/groupType.js';

const DB: any = db;

class GroupsService {
  async getAllGroups() {
    return await DB.group.findAll();
  }

  async getGroup(id: string) {
    return await DB.group.findByPk(id);
  }

  async createGroup(item: GroupType) {
    return await DB.group.create(item, { returning: true });
  }

  async updateGroup(currentGroup: GroupType) {
    const { id, name, permissions } = currentGroup;

    return await DB.group.update({ name, permissions }, { where: { id }, returning: true });
  }

  async deleteGroup(id: string) {
    return await DB.group.destroy({ where: { id } });
  }
}

export default new GroupsService();
