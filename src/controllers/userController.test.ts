import supertest from 'supertest';
import app from './../app.js';

describe('UserController', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true);
  });

  // it('returns bad request if first name is missing', async () => {
  //   const res = await supertest(app).post('/api/test').send({ firstName: 'Jan' });
  //   expect(res.statusCode).toEqual(201);
  // });
});
