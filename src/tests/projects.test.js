import request from 'supertest';
import app from '../app';
import ProjectSchema from '../models/Projects';
import projectsSeed from '../seeds/projects';

beforeAll(async () => {
  await ProjectSchema.collection.insertMany(projectsSeed);
});

describe('GET /projects', () => {
  test('response should return 200 status', async () => {
    await request(app).get('/projects').send();
  });
});
