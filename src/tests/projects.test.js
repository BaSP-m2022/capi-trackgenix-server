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

  test('It should pop a validation error, project name and type missing', async () => {
    const response = await request(app).post('/projects').send({
      projectName: '',
      employees: [{}],
    });
    expect(response.status).toBe(400);
  });
});

describe('POST /projects/addEmployee', () => {
  test('It should add an employee to the project', async () => {
    const response = await request(app).post('/projects/addEmployee/628beae11c36e7cc087664ae').send({
      idEmployee: '1234',
      employeeRole: 'QA',
      isProjectManager: true,
      hours: 38,
      salary: 50000,
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
  });

  test('It should not add an employee, empty strings', async () => {
    const response = await request(app).post('/projects/addEmployee/628beae11c36e7cc087664ae').send({
      idEmployee: '',
      employeeRole: '',
      isProjectManager: true,
      hours: 38,
      salary: 50000,
    });
    expect(response.status).toBe(400);
    expect(response.body.error).not.toBe(false);
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

  test('It should not edit the project', async () => {
    const response = await request(app).put('/projects/628beae11c36e7cc087664ae').send({
      projectName: '',
      projectType: '',
      employees: [],
    });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /projects', () => {
  test('It should delete a project', async () => {
    const response = await request(app).delete('/projects/628beae11c36e7cc087664ae').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
  });

  test('It should not delete a project', async () => {
    const response = await request(app).delete('/projects/628beae11c36e7cc08766asd').send();
    expect(response.status).toBe(400);
    expect(response.body.error).not.toBe(false);
  });
});
