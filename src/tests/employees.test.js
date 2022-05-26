/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Employee from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employee.collection.insertMany(employeesSeed);
});

describe('GET', () => {
  test('response should return a 200 status', async () => { // PASA
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });

  test('response should return false error', async () => { // PASA
    const response = await request(app).get('/employees').send();
    expect(response.error).toBe(false);
  });

  test('response should return at least one employee', async () => { // PASA
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET by ID', () => {
  test('response should return 200 status and false error', async () => { // PASA
    const response = await request(app).get(`/employees/${employeesSeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
  });

  test('response should return an error, empty employee', async () => { // PASA
    const response = await request(app).get('/employees/60d4a32f257e066e9495ce15').send();
    expect(response.status).toBe(404);
  });

  test('response should return an error, bad path', async () => { // PASA
    const response = await request(app).get('/asdasd').send();
    expect(response.status).toBe(404);
  });

  test('response should return an admin with all properties', async () => { // PASA
    const response = await request(app).get(`/employees/${employeesSeed[0]._id}`).send();
    expect(response.body.data).toHaveProperty('firstName');
    expect(response.body.data).toHaveProperty('lastName');
    expect(response.body.data).toHaveProperty('dateOfBirth');
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('phone');
    expect(response.body.data).toHaveProperty('address');
    expect(response.body.data).toHaveProperty('location');
  });
});

describe('POST', () => {
  test('should create an employee', async () => {
    const response = await request(app).post('/employees').send({ // PASA
      firstName: 'Lionel',
      lastName: 'Messi',
      dateOfBirth: '06/24/1987',
      email: 'lionelmessi@hotmail.com',
      phone: '101 010 1010',
      address: 'Grandoli 525',
      location: 'Rosario',
      projectId: '628b98f137ba1471222b4958',
    });
    expect(response.status).toBe(201);
  });

  test('response should return a 400 status due to a missing field', async () => { // PASA
    const response = await request(app).post('/employees').send({
      firstName: 'Lionel',
      lastName: 'Messi',
      dateOfBirth: '06/24/1987',
      email: 'lionelmessi@hotmail.com',
      phone: '101 010 1010',
      address: 'Grandoli 525',
    });
    expect(response.status).toBe(400);
  });

  test('should not create an employee', async () => { // PASA
    const response = await request(app).post('/employees').send();
    expect(response.status).toBe(400);
  });

  test('It should NOT create a new employee, EMAIL format did not pass validation', async () => { // PASA
    const response = await request(app).post('/employees').send({
      firstName: 'Lionel',
      lastName: 'Messi',
      dateOfBirth: '06/24/1987',
      email: 'lionelmessixgmail.com',
      phone: '101 010 1010',
      address: 'Grandoli 525',
      location: 'Rosario',
      projectId: '628b98f137ba1471222b4958',
    });
    expect(response.status).toBe(400);
  });

  test('message should indicate the creation of the employee', async () => { // PASA
    const response = await request(app).post('/employees').send({
      firstName: 'Lionel',
      lastName: 'Messi',
      dateOfBirth: '06/24/1987',
      email: 'lionelmessi@hotmail.com',
      phone: '101 010 1010',
      address: 'Grandoli 525',
      location: 'Rosario',
      projectId: '628b98f137ba1471222b4958',
    });
    expect(response.body.msg).toEqual('Employee created correctly');
  });
});

describe('PUT', () => {
  test('should update the employee', async () => {
    const response = await request(app).put(`/employees/${employeesSeed[0]._id}`).send({ // PASA
      firstName: 'Pepito',
      lastName: 'Xaviert',
      dateOfBirth: '01/01/1955',
      email: 'pepito@hotmail.com',
      phone: '888 888 8888',
      address: 'Val 230',
      location: 'Valencia',
    });
    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
  });

  test('It should show an employee updated message', async () => { // PASA
    const response = await request(app).put(`/employees/${employeesSeed[0]._id}`).send({
      firstName: 'Pepito',
      lastName: 'Xaviert',
      dateOfBirth: '01/01/1955',
      email: 'pepito@hotmail.com',
      phone: '888 888 8888',
      address: 'Val 230',
      location: 'Valencia',
    });
    expect(response.body.message).toEqual('Employee successfully updated');
  });

  test('It should NOT update the employee, EMAIL format did not pass validation', async () => { // PASA
    const response = await request(app).put(`/employees/${employeesSeed[0]._id}`).send({
      firstName: 'Pepito',
      lastName: 'Xaviert',
      dateOfBirth: '01/01/1955',
      email: 'pepitoxhotmail.com',
      phone: '888 888 8888',
      address: 'Val 230',
      location: 'Valencia',
    });
    expect(response.status).toBe(400);
  });
});

describe('DELETE', () => {
  test('response should return 200 status, false error and successful message ', async () => { // PASA
    const response = await request(app).delete(`/employees/${employeesSeed[0]._id}`);
    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
    expect(response.body.msg).toEqual(`The Employee with id = ${employeesSeed[0]._id} has been deleted`);
  });

  test('response should return a 404 status', async () => { // PASA
    const response = await request(app).delete('/employees/60d4a32f257e066e9495ce15').send();
    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('The Employee with id = 60d4a32f257e066e9495ce15 has not been found');
  });

  test('response should return an error, bad path', async () => { // PASA
    const response = await request(app).delete('/asdasd').send();
    expect(response.status).toBe(404);
  });
});
