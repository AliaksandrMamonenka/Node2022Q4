import { Request, Response } from 'express';
import userGroupService from '../services/userGroupService.js';
import UserService from '../services/userService.js';
import { userUpdateValidation, userValidation } from '../validations/userValidation.js';

class UserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const getAllUsers = await UserService.getAllUsers(req.query);
      return res.status(200).json(getAllUsers);
    } catch (error) {
      throw error;
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const getUser = await UserService.getUser(req.params.id);
      return res.status(200).json(getUser);
    } catch (error) {
      throw error;
    }
  }

  async createUser(req: Request, res: Response) {
    const { error } = await userValidation(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    try {
      const createUser = await UserService.createUser(req.body);
      return res.status(200).json(createUser);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(req: Request, res: Response) {
    const { error } = await userUpdateValidation(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    try {
      const updateUser = await UserService.updateUser(req.body);
      return res.status(200).json(updateUser);
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const deleteUser = await UserService.deleteUser(req.params.id);
      return res.status(200).json(deleteUser);
    } catch (error) {
      throw error;
    }
  }

  async assignToGroup(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      const user = await userGroupService.addUsersToGroup(req.params.groupId, userId);
      return res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  }
}
export default new UserController();
