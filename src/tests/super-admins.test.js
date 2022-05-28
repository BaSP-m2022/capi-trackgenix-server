// Used for easier testing, will be changed at final release.
import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/SuperAdmin';
import superAdminSeed from '../seeds/super-admins';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminSeed);
});

// POST test

describe('POST /super-admins/add', () => {
  test('Response should create a super-admin', async () => {
    const response = await request(app).post('/super-admins/add').send({
      email: 'usuario@mail.com',
      password: '1234',
    });
    expect(response.status).toBe(201);
    expect(response.body.msg).toEqual('Super Admin succesfully added');
  });

  test('should not create super-admin because of missing email', async () => {
    const response = await request(app).post('/super-admins/add').send({
      email: '',
      password: '1234',
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Super Admin add validation error');
    // Message comes from validations
  });

  test('should not create super-admin because of missing password', async () => {
    const response = await request(app).post('/super-admins/add').send({
      email: 'usuario@mail.com',
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Super Admin add validation error');
    // Message comes from validations
  });
});
// // PUT test

describe('PUT /super-admins/edit/:id', () => {
  test('Response should edit a super-admin', async () => {
    const response = await request(app).put('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
      email: 'usuario@mail.com',
      password: '1234',
    });
    expect(response.status).toBe(201);
    expect(response.body.msg).toEqual('Super Admin updated');
  });

  test('should not edit super-admin because of id not existing', async () => {
    const response = await request(app).put('/super-admins/edit/628b8ddf088673d6a2471ae3').send({
      email: 'usuario@mail.com',
      password: '1234',
    });
    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('Super Admin not found');
  });

  test('should not edit super-admin because of email error', async () => {
    const response = await request(app).put('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
      email: '',
      password: '1234',
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Super Admin edit validation error');
    // Message comes from validations
  });

  test('should not create super-admin because of password error', async () => {
    const response = await request(app).put('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
      email: 'usuario@mail.com',
      password: '',
    });
    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Super Admin edit validation error');
    // Message comes from validations
  });
});

// // DELETE test

describe('DELETE /super-admins/delete/:id', () => {
  test('Response should delete a super-admin', async () => {
    const response = await request(app).delete('/super-admins/delete/628b8ddf088673d6a24b7ae3').send();
    expect(response.status).toBe(200);
    expect(response.body.msg).toEqual('Super Admin succefully deleted');
  });

  test('should not delete super-admin because of id not existing', async () => {
    const response = await request(app).delete('/super-admins/delete/62d6a24b7ae3').send();
    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('Super Admin not found');
  });
});
