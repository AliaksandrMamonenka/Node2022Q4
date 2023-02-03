import { Request, Response } from 'express';
import GroupService from '../services/groupService.js';
import { groupValidation, groupUpdateValidation } from '../validations/groupValidation.js';

class GroupController {
  async getAllGroups(req: Request, res: Response) {
    try {
      const getAllGroups = await GroupService.getAllGroups();
      return res.status(200).json(getAllGroups);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getGroup(req: Request, res: Response) {
    try {
      const getGroup = await GroupService.getGroup(req.params.id);
      return res.status(200).json(getGroup);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createGroup(req: Request, res: Response) {
    const { error } = await groupValidation(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    try {
      const createGroup = await GroupService.createGroup(req.body);
      return res.status(200).json(createGroup);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateGroup(req: Request, res: Response) {
    const { error } = await groupUpdateValidation(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    try {
      const updateGroup = await GroupService.updateGroup(req.body);
      return res.status(200).json(updateGroup);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteGroup(req: Request, res: Response) {
    try {
      const deleteGroup = await GroupService.deleteGroup(req.params.id);
      return res.status(200).json(deleteGroup);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default new GroupController();
