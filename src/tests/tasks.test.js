/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Task from '../models/Tasks';
import taskSeed from '../seeds/tasks';

beforeAll(async () => {
  await Task.collection.insertMany(taskSeed);
});

describe('POST /tasks', () => {
  test('It should create a new task', async () => {
    const response = await request(app).post('/tasks').send({
      idEmployee: '62894b9257165ab30f868589',
      taskName: 'Test',
      description: 'loremlormeofjkldjakljlakgklhdlalkfhajhlh',
      status: 'To do',
      priority: 'High',
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
  });
  test('it should give a validation error', async () => {
    const response = await request(app).post('/tasks').send({
      idEmployee: '62894b9257165ab30f868589',
      taskName: 'Test',
      description: 'loremlormeofjkldjakljlakgklhdlalkfhajhlh',
      status: 'To do',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
  test('it should return a validation error', async () => {
    const response = await request(app).post('/tasks').send({
      idEmployee: '62894b9257165ab30f868589',
      taskName: 'Test',
      description: 'loremlormeofjkldjakljlakgklhdlalkfhajhlh',
      status: 'To do',
      priority: 'affgfa',
    });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
});
describe('DELETE /tasks/', () => {
  test('It should delete a task', async () => {
    const response = await request(app).delete(`/tasks/${taskSeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
});

describe('GET /tasks', () => {
  test('It should get the tasks list', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('GET /tasks/filter', () => {
  test('It should get tasks with the same priority', async () => {
    const response = await request(app).get('/tasks/filter/?priority=High').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('It should return one task and be successful', async () => {
    const response = await request(app).get('/tasks/filter/?priority=Medium').send();
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data.length).toBe(1);
  });
});

describe('GET /tasks/:id', () => {
  test('It should get only one task', async () => {
    const response = await request(app).get(`/tasks/${taskSeed[1]._id}`).send();
    expect(response.status).toBe(200);
  });
});

describe('PUT /tasks/:id', () => {
  test('It should alter a task', async () => {
    const response = await request(app).put(`/tasks/${taskSeed[1]._id}`).send({
      taskName: 'task',
    });
    expect(response.status).toBe(200);
  });
  test('It should fail to alter a task', async () => {
    const response = await request(app).put(`/tasks/${taskSeed[1]._id}`).send({
      idEmployee: '62894b9257165ab30f868598',
      taskName: 'Test Task 2',
      description: 'loremlormeofjkldja kljlakgklhdlalkfhajhlh',
      status: 'To do',
      priority: 'medium',
    });
    expect(response.status).toBe(400);
  });
  test('It should fail to alter a task', async () => {
    const response = await request(app).put(`/tasks/${taskSeed[1]._id}`).send({
      idEmployee: '62894b9257165ab30f868598',
      taskName: 'Test Task 2',
      description: 'loremlormeofjkldja kljlakgklhdlalkfhajhlh',
      status: 'do',
      priority: 'Medium',
    });
    expect(response.status).toBe(400);
  });
});
