import request from 'supertest';
import express from 'express';
import router from './index'; 

describe('Router', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(router);
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404); 
  });


});
