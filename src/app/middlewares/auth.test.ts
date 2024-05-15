import request from 'supertest';
import express from 'express';
import { auth } from './auth';

jest.mock('../../helpers/jwtHelper');
jest.mock('../../config', () => ({ jwt: { secret: 'test-secret' } }));

describe('auth middleware', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(auth());
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(err.statusCode || 500).json({ success: false, message: err.message });
    });
  });

  it('should pass if token is provided and verified', async () => {
    const verifiedUser = { userId: 'test-user-id', role: 'admin' };
    const { JwtHelper } = require('../../helpers/jwtHelper');
    JwtHelper.verifyToken.mockResolvedValue(verifiedUser);

    const res = await request(app).get('/').set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });

  it('should throw an error if token is not provided', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ success: false, message: 'Token is not Found !!' });
  });

  it('should throw an error if token is invalid', async () => {
    const { JwtHelper } = require('../../helpers/jwtHelper');
    JwtHelper.verifyToken.mockRejectedValue(new Error('Invalid token'));

    const res = await request(app).get('/').set('Authorization', 'Bearer invalid-token');

    expect(res.status).toBe(403);
    expect(res.body).toEqual({
          "message": "User is not Found !!",
           "success": false,
         });
  });

  it('should throw an error if user role is not authorized', async () => {
    const verifiedUser = { userId: 'test-user-id', role: 'user' };
    const { JwtHelper } = require('../../helpers/jwtHelper');
    JwtHelper.verifyToken.mockResolvedValue(verifiedUser);

    const res = await request(app).get('/').set('Authorization', 'Bearer valid-token');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({});
  });
});
