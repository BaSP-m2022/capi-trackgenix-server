import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeed);
});

describe('/GET /admins', () => {
  test('return status 200 admins', async () => {
    const response = request(app).get('/admins');
    console.log('responseresponseresponseresponse', response.data);
  });
});
