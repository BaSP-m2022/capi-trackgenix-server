import request from 'supertest';
import app from '../index';
import Admin from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeed);
});

describe('/GET /admins', () => {
  test('return status 200 admins', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.error).toBeFalsy();
  });
});
