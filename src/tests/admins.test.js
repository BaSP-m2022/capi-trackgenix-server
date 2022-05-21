import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  const algo = await Admin.collection.insertMany(adminsSeed);
  console.log(algo);
});

describe('/GET /admins', () => {
  test('return status 200 admins', async () => {
    const response = await request(app).get('/');
    expect(response.error).toBeFalsy();
  });
});
