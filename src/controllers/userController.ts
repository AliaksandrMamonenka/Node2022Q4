import { Request, Response } from 'express';
import userGroupService from '../services/userGroupService.js';
import UserService from '../services/userService.js';
import { userUpdateValidation, userValidation } from '../validations/userValidation.js';

class UserController {
  async testcontroller(req: Request, res: Response, next: (arg: any) => void) {
    if (!req.body.firstName) {
      res.status(400).json('you need to pass a firstName');
      return;
    }
    res.sendStatus(201);
  }

  async getAllUsers(req: Request, res: Response, next: (arg: any) => void) {
    try {
      const getAllUsers = await UserService.getAllUsers(req.query);
      return res.status(200).json(getAllUsers);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: (arg: any) => void) {
    try {
      const getUser = await UserService.getUser(req.params.id);
      return res.status(200).json(getUser);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: (arg: any) => void) {
    const { error } = await userValidation(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    try {
      const createUser = await UserService.createUser(req.body);
      return res.status(200).json(createUser);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: (arg: any) => void) {
    const { error } = await userUpdateValidation(req.body);

    if (error) {
      return res.status(400).json(error.details);
    }

    try {
      const updateUser = await UserService.updateUser(req.body);
      return res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: (arg: any) => void) {
    try {
      const deleteUser = await UserService.deleteUser(req.params.id);
      return res.status(200).json(deleteUser);
    } catch (error) {
      next(error);
    }
  }

  async assignToGroup(req: Request, res: Response, next: (arg: any) => void) {
    const { userId } = req.body;

    try {
      const user = await userGroupService.addUsersToGroup(req.params.groupId, userId);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: (arg: any) => void) {
    const { login, password } = req.body;

    try {
      const userData = await UserService.login(login, password);

      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
