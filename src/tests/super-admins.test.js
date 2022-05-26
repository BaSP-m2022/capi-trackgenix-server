import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/SuperAdmin';
import superadminsSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superadminsSeed);
});

describe('GET /super-admins/', () => {
  test('Response should return all Super Admins', async () => {
    const response = await request(app).get('/super-admins');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.error).toBe(false);
  });
  test('Response should not return Super Admins List - Wrong Path', async () => {
    const response = await request(app).get('/Super');

    expect(response.status).toBe(404);
  });
});

describe('GET by ID /super-admins/:id', () => {
  test('Should return one SuperAdmin', async () => {
    const response = await request(app).get('/super-admins/628d4ff938e26460ec7b0772');
    expect(response.status).toBe(200);
  });
  test('Should not return a SuperAdmin', async () => {
    const response = await request(app).get('/628ad4ff938e26460ec7b0773');

    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('GET by EMAIL /SuperAdmin/:email', () => {
  test('Should return one SuperAdmin', async () => {
    const response = await request(app).get('/super-admins/getByEmail/asdfasdo@sdvadail.com');

    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
  });
  test('Should not return a SuperAdmin', async () => {
    const response = await request(app).get('/getByEmail/asdfasdo123@sdvadail.com');

    expect(response.status).toBe(404);
  });
});
