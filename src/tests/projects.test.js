import request from 'supertest';
import app from '../app';
import ProjectSchema from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await ProjectSchema.collection.insertMany(projectsSeed);
});

describe('GET /projects', () => {
  test('response should return 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });
  test('response should return one project specified by id', async () => {
    const response = await request(app).get('/projects/628beae11c36e7cc087664ae').send();
    expect(response.status).toBe(200);
  });
});

describe('POST /projects', () => {
  test('It should create a new project', async () => {
    const response = await request(app).post('/projects').send({
      projectName: 'hola',
      projectType: 'chau',
      employees: [{
        idEmployee: '628beae11c36e7cc087664ae',
        employeeRole: 'QA',
        isProjectManager: true,
        hours: 26,
        salary: 25000,
      }],
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
  });
});

describe('PUT /projects/:id', () => {
  test('It should edit a project', async () => {
    const response = await request(app).put('/projects/628beae11c36e7cc087664ae').send({
      projectName: 'aloha',
      projectType: 'adios',
      employees: [],
    });
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
});

describe('DELETE /projects', () => {
  test('It should delete a project', async () => {
    const response = await request(app).delete('/projects/628beae11c36e7cc087664ae').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });
});
