import request from 'supertest';
import app from '../app';
import TimeSheets from '../models/TimeSheet';
import timeSheetSeed from '../seeds/timeSheets';

beforeAll(async () => {
  await TimeSheets.collection.insertMany(timeSheetSeed);
});

describe('GET /time-sheets/', () => {
  test('Response should return all timeSheets', async () => {
    const response = await request(app).get('/time-sheets');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.error).toBe(false);
  });

  test('Response should return only one timeSheet', async () => {
    const response = await request(app).get('/time-sheets/628266d2f7adf82df1518089').send();

    expect(response.status).toBe(200);
    expect(response.error).toBe(false);
  });

  test('Response should not found timeSheet (ID doesnt exist)', async () => {
    const response = await request(app).get('/time-sheets/628266d2f7adf82df151000').send();

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(true);
  });

  test('Response should filter all timeSheets by dailyHS', async () => {
    const response = await request(app).get('/time-sheets/getByHours/?hoursWorked=40').send();

    expect(response.body.msg).toEqual('The timeSheet has been found');
    expect(response.error).toBe(false);
  });

  test('Response should not found any sheet with that dailyHS', async () => {
    const response = await request(app).get('/time-sheets/getByHours/?hoursWorked=99').send();

    expect(response.body.msg).toEqual('The timeSheet has not been found');
    expect(response.body.error).toBe(true);
  });
});

describe('POST /time-sheets', () => {
//   test('Response should return the created timeSheet', async () => {
//     const response = await request(app).post('/time-sheets/').send({
//       employee: 400,
//       hoursWorked: 64,
//       dailyHS: 8,
//     });

  //     expect(response.status).toBe(201);
  //     expect(response.error).toBe(false);
  //   });

  test('Response should return validation error 1 (missing idEmployee)', async () => {
    const response = await request(app).post('/time-sheets/').send({
      hoursWorked: 64,
      dailyHS: 8,
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Validation error 1');
  });

  test('Response should return validation error 1 (missing hoursWorked)', async () => {
    const response = await request(app).post('/time-sheets/').send({
      idEmployee: 1099,
      dailyHS: 8,
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Validation error 1');
  });

  test('Response should return validation error 1 (missing dailyHS)', async () => {
    const response = await request(app).post('/time-sheets/').send({
      idEmployee: 1099,
      hoursWorked: 64,
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Validation error 1');
  });

  test('Response should return validation error 1 (empty object)', async () => {
    const response = await request(app).post('/time-sheets/').send({});

    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Validation error 1');
  });
});

describe('PUT /time-sheets/:id', () => {
  test('Response should return a edited timeSheet', async () => {
    const response = await request(app).put('/time-sheets/628266cdf7adf82df1518085').send({
      hoursWorked: 99,
      dailyHS: 9,
    });

    expect(response.status).toBe(201);
    expect(response.error).toBe(false);
  });

  test('Response should return a validation error 2 (missing hoursWorked)', async () => {
    const response = await request(app).put('/time-sheets/628266cdf7adf82df1518085').send({
      dailyHS: 9,
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Validation error 2');
  });

  test('Response should return a validation error 2 (missing dailyHS)', async () => {
    const response = await request(app).put('/time-sheets/628266cdf7adf82df1518085').send({
      hoursWorked: 99,
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toEqual('Validation error 2');
  });
});

describe('DELETE /time-sheets/:id', () => {
  test('Response should return a deleted timeSheet', async () => {
    const response = await request(app).delete('/time-sheets/628266cdf7adf82df1518085').send();

    expect(response.status).toBe(200);
    expect(response.body.msg).toEqual('the project has been succefully deleted');
    expect(response.error).toBe(false);
  });

  test('Response should return not found sheet', async () => {
    const response = await request(app).delete('/time-sheets/628266cdf7adf82df1518000').send();

    expect(response.status).toBe(404);
    expect(response.body.msg).toEqual('The sheet has not been found');
  });
});
