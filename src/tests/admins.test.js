import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminsSeed);
});

describe('GET /admins', () => {
  describe('get all /admins', () => {
    test('should return all admins list', async () => {
      const response = await request(app).get('/admins').send();
      expect(response.status).toBe(200);
      expect(response.error).toBeFalsy();
      expect(response.body.data.length).toBeGreaterThan(0);
    });
    test('should not return all admins list, wrong path', async () => {
      const response = await request(app).get('/admin').send();
      expect(response.status).toBe(404);
    });
  });
  describe('get by id /admins/:id', () => {
    test('should return one admin', async () => {
      const response = await request(app).get('/admins/62894b9257165ab30f868536').send();
      expect(response.status).toBe(200);
      expect(response.error).toBeFalsy();
    });
    test('should not return admin, wrong id', async () => {
      const response = await request(app).get('/admins/62894b9257165ab30f868535').send();
      expect(response.status).toBe(404);
      expect(response.error).toBeTruthy();
      expect(response.body.msg).toBe("Error, data not found:(TypeError: Cannot read properties of null (reading 'id'))");
    });
  //   test('response should return at least one admin', async () => {
  //     const response = await request(app).get('/admins/62894b9257165ab30f868536').send();
  //     console.log(response.body.data.length);
  //     expect(response.body.data.length).toBeGreaterThan(0);
  //   });
  });
});

describe('POST /admins', () => {
  test('should create an admin', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'testeo',
      lastName: 'garcia',
      email: 'djeffray9@uol.com.br',
      adminStatus: true,
      projects: [],
    });
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    expect(response.body.msg).toBe('Admin created successfully');
  });
  test('should not create an admin, not sending data', async () => {
    const response = await request(app).post('/admins').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('error first name required', async () => {
    const response = await request(app).post('/admins').send({
      lastName: 'garcia',
      email: 'djeffray9@uol.com.br',
      adminStatus: true,
      projects: [],
    });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.msg).toBe('There was a validation error: "firstName" is required');
  });
  test('error last name required', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'testeo',
      email: 'djeffray9@uol.com.br',
      adminStatus: true,
      projects: [],
    });
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.msg).toBe('There was a validation error: "lastName" is required');
  });
});

describe('PUT /admins/:id', () => {
  test('should edit an admin', async () => {
    const response = await request(app).put('/admins/62894b9257165ab30f868536').send({
      firstName: 'testeo changed',
      lastName: 'garcia changed',
      email: 'djeffray9@uol.com.br',
      adminStatus: true,
      projects: [],
    });
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
    expect(response.body.msg).toBe('Admin id: 62894b9257165ab30f868536 edited successfully.');
  });
  test('should not edit an admin, id incorrect', async () => {
    const response = await request(app).put('/admins/62894b9257165ab30f868535').send({
      firstName: 'testeo changed',
      lastName: 'garcia changed',
      email: 'djeffray9@uol.com.br',
      adminStatus: true,
      projects: [],
    });
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
    expect(response.body.msg).toBe('Admin id: 62894b9257165ab30f868535 not found.');
  });
});

describe('DELETE /admins/:id', () => {
  test('should delete an admin', async () => {
    const response = await request(app).delete('/admins/62894b9257165ab30f868536').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
    expect(response.body.msg).toBe('Admin id: 62894b9257165ab30f868536 deleted successfully.');
  });
  test('should not delete an admin, id incorrect', async () => {
    const response = await request(app).delete('/admins/62894b9257165ab30f868535').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
    expect(response.body.msg).toBe('Error, admin was not deleted');
  });
});
