import request from 'supertest';
import app from '../app';
import Task from '../models/Tasks';
import taskSeed from '../seeds/tasks';

beforeAll(async () => {
  await Task.collection.insertMany(taskSeed);
});

describe('POST /tasks', () => {
  test('it Should create a new task', async () => {
    const response = await request(app).post('/tasks').send({
      idEmployee: '62894b9257165ab30f868589',
      taskName: 'Test',
      description: 'loremlormeofjkldjakljlakgklhdlalkfhajhlh',
      status: 'To do',
      priority: 'High',
    });
    expect(response.status).toBe(201);
  });
});
describe('DELETE /tasks/', () => {
  test('It should delete a task', async () => {
    const response = await request(app).delete('/tasks/628aa94a0c96143f060b85a7').send();
    expect(response.status).toBe(200);
  });
});

describe('GET /tasks', () => {
  test('It should get the tasks list', async () => {
    const response = await request(app).get('/tasks');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /tasks/filter', () => {
  test('It should get tasks with the same priority', async () => {
    const response = await request(app).get('/tasks/filter/?priority=Medium').send();
    expect(response.status).toBe(200);
  });
});

describe('GET /tasks/:id', () => {
  test('It should get only one task', async () => {
    const response = await request(app).get('/tasks/628aa94a0c96143f060b85a8').send();
    expect(response.status).toBe(200);
  });
});

describe('PUT /tasks/:id', () => {
  test('It should alter a task', async () => {
    const response = await request(app).put('/tasks/628aa94a0c96143f060b85a8').send({
      taskName: 'task',
    });
    expect(response.status).toBe(200);
  });
});
