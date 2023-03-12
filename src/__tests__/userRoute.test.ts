import request from 'supertest';
import app from '../app.js';
import UserService from '../services/userService.js';
import UserGroupService from '../services/userGroupService.js';
import { Request, Response } from 'express';

jest.mock('../middleware/checkAuthorization.js', () => {
  return jest.fn((request: Request, response: Response, next: (arg?: any) => void) => next());
});

jest.mock('../services/groupService.js', () => ({
  getAllGroups: jest.fn(),
  getGroup: jest.fn(),
  createGroup: jest.fn(),
  updateGroup: jest.fn(),
  deleteGroup: jest.fn(),
}));

jest.mock('../services/userService.js', () => ({
  getAllUsers: jest.fn(),
  getUser: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  login: jest.fn(),
}));

jest.mock('../services/userGroupService.js', () => ({
  addUsersToGroup: jest.fn(),
}));

describe('userRouter', () => {
  describe('getAllUsers ', () => {
    it('should return a list of users', async () => {
      const res = await request(app).get('/api/users');

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (UserService.getAllUsers as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).get('/api/users');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('getUser ', () => {
    const id = 1;

    it('should return a single user', async () => {
      const res = await request(app).get(`/api/users/${id}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (UserService.getUser as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).get(`/api/users/${id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('createUser', () => {
    it('should pass validation and create new user', async () => {
      const res = await request(app).post('/api/users').send({
        login: 'Ned',
        password: 'NedwardFlanders',
        age: 45,
      });

      expect(res.statusCode).toEqual(200);
    });

    it('should NOT pass validation', async () => {
      const res = await request(app).post('/api/users').send({
        not: 'not',
        valid: 'valid',
        params: 'params',
      });

      expect(res.statusCode).toEqual(400);
    });

    it('should throw an error', async () => {
      (UserService.createUser as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).post('/api/users').send({
        login: 'Ned',
        password: 'NedwardFlanders',
        age: 45,
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('updateUser', () => {
    it('should pass validation and update user', async () => {
      const res = await request(app).put('/api/users').send({
        id: '2',
        login: 'Ned',
        password: 'NedwardFlanders',
        age: 45,
      });
      expect(res.statusCode).toEqual(200);
    });

    it('should NOT pass validation', async () => {
      const res = await request(app).put('/api/users').send({
        not: 'not',
        valid: 'valid',
        params: 'params',
      });

      expect(res.statusCode).toEqual(400);
    });

    it('should throw an error', async () => {
      (UserService.updateUser as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).put('/api/users').send({
        id: '2',
        login: 'Ned',
        password: 'NedwardFlanders',
        age: 45,
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('deleteUser', () => {
    const id = 1;

    it('should delete user', async () => {
      const res = await request(app).delete(`/api/users/${id}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (UserService.deleteUser as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).delete(`/api/users/${id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('assignToGroup', () => {
    const groupId = 2;
    const userId = 1;
    it('should assign user to group', async () => {
      const res = await request(app).post(`/api/users/assign-to-group/${groupId}`).send({ userId });

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (UserGroupService.addUsersToGroup as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).post(`/api/users/assign-to-group/${groupId}`).send({ userId });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const res = await request(app).post('/api/login').send({ login: 'Jan', password: 'ClodVandam' });

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (UserService.login as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).post('/api/login').send({ login: 'Jan', password: 'ClodVandam' });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });
});
