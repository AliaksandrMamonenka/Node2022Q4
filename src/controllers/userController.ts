import { Request, Response } from 'express';
import UserService from '../services/userService.js';
import { userUpdateValidation, userValidation } from '../validations/userValidation.js';

export const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json(UserService.getAllUsers(req.query));
};

export const getUser = (req: Request, res: Response) => {
  res.status(200).json(UserService.getUser(req.params.id));
};

export const createUser = (req: Request, res: Response) => {
  const { error } = userValidation(req.body);

  if (error) {
    return res.status(400).json(error.details);
  }

  res.status(200).json(UserService.createUser(req.body));
};

export const updateUser = (req: Request, res: Response) => {
  const { error } = userUpdateValidation(req.body);

  if (error) {
    return res.status(400).json(error.details);
  }

  res.status(200).json(UserService.updateUser(req.body));
};

export const deleteUser = (req: Request, res: Response) => {
  res.status(200).json(UserService.deleteUser(req.params.id));
};
