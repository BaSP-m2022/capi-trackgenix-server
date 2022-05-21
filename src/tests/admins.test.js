import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeed);
});

describe('/GET /admins', () => {
  test('return status 200 admins', async () => {
    const response = await request(app);
    console.log(response);

    expect(response.error).toBeFalsy();
  });
});
