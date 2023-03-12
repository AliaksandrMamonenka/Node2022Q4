import request from 'supertest';
import app from '../app.js';
import GroupService from '../services/groupService.js';
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

describe('GroupController', () => {
  describe('getAllGroups ', () => {
    it('should return a list of groups', async () => {
      const res = await request(app).get('/api/group');

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (GroupService.getAllGroups as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).get('/api/group');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('getGroup ', () => {
    const id = 1;

    it('should return a single group', async () => {
      const res = await request(app).get(`/api/group/${id}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (GroupService.getGroup as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).get(`/api/group/${id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('createGroup ', () => {
    it('should create new group', async () => {
      const res = await request(app).post('/api/group').send({
        name: 'test',
        permissions: 'SHARE',
      });

      expect(res.statusCode).toEqual(200);
    });

    it('should NOT pass validation', async () => {
      const res = await request(app)
        .post('/api/group')
        .send({
          nameError: 'nameError',
          permissionsError: ['A', 'B', 'C'],
        });

      expect(res.statusCode).toEqual(400);
    });

    it('should throw an error', async () => {
      (GroupService.createGroup as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).post('/api/group').send({
        name: 'test',
        permissions: 'DELETE',
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('updateGroup ', () => {
    it('should update existing group', async () => {
      const res = await request(app).put('/api/group').send({
        id: 3,
        name: 'test',
        permissions: 'SHARE',
      });

      expect(res.statusCode).toEqual(200);
    });

    it('should NOT pass validation', async () => {
      const res = await request(app)
        .put('/api/group')
        .send({
          id: 3,
          nameError: 'nameError',
          permissionsError: ['A', 'B', 'C'],
        });

      expect(res.statusCode).toEqual(400);
    });

    it('should throw an error', async () => {
      (GroupService.updateGroup as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).put('/api/group').send({
        id: 3,
        name: 'test',
        permissions: 'DELETE',
      });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });

  describe('deleteGroup ', () => {
    const id = 1;

    it('should delete group', async () => {
      const res = await request(app).delete(`/api/group/${id}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should throw an error', async () => {
      (GroupService.deleteGroup as jest.Mock).mockImplementation(() => {
        throw new Error();
      });

      const res = await request(app).delete(`/api/group/${id}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({ message: 'Server error: something went wrong' });
    });
  });
});
