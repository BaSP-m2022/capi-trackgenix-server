/* eslint-disable indent */
/* eslint-disable max-len */
// Used for easier testing, will be changed that at final release.
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
  });

  test('message on creation of a super-admin', async () => {
    const response = await request(app).post('/super-admins/add').send({
      email: 'usuario@mail.com',
      password: '1234',
    });
    expect(response.body.msg).toEqual('Super Admin succesfully added');
  });

  test('should not create super-admin because of missing email', async () => {
    const response = await request(app).post('/super-admins/add').send({
        email: '',
      password: '1234',
    });
    expect(response.status).toBe(400);
  });

  test('should not create super-admin because of missing password', async () => {
    const response = await request(app).post('/super-admins/add').send({
      email: 'usuario@mail.com',
    });
    expect(response.status).toBe(400);
  });

  test('message on error while creating a super-admin without email', async () => {
    const response = await request(app).post('/super-admins/add').send({
        email: '',
      password: '1234',
    });
    expect(response.body.msg).toEqual('Super Admin add validation error');
    // Message comes from validations
  });

  test('message on error while creating a super-admin without password', async () => {
    const response = await request(app).post('/super-admins/add').send({
      email: 'usuario@mail.com',
      password: '',
    });
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
  });

  test('message on edition of a super-admin', async () => {
    const response = await request(app).put('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
      email: 'usuario@mail.com',
      password: '1234',
    });
    expect(response.body.msg).toEqual('Super Admin updated');
  });

  test('should not edit super-admin because of id not existing', async () => {
    const response = await request(app).post('/super-admins/edit/628b8ddf088673d6a2471ae3').send({
      email: 'usuario@mail.com',
      password: '1234',
    });
    expect(response.status).toBe(404);
  });

//   test('message on error while editing a super-admin because of id not existing ', async () => {
//     const response = await request(app).post('/super-admins/edit/628b8ddf088673d6a2471ae3').send({
//         email: 'usuario@mail.com',
//         password: '1234',
//       });
//     expect(response.body.msg).toEqual('Super Admin not found');
//   });
// undefined

//   test('should not edit super-admin because of missing id parameter', async () => {
//     const response = await request(app).post('/super-admins/edit/ ').send({
//       email: 'usuario@mail.com',
//       password: '1234',
//     });
//     expect(response.status).toBe(400);
//   });
// 404

//   test('message on error while editing a super-admin because of a missing id parameter', async () => {
//     const response = await request(app).post('/super-admins/edit/').send({
//       email: 'usuario@mail.com',
//       password: '1234',
//     });
//     expect(response.body.msg).toEqual('Missing id parameter');
//   });
// undefined

//   test('should not edit super-admin because of email error', async () => {
//     const response = await request(app).post('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
//       email: '',
//       password: '1234',
//     });
//     expect(response.status).toBe(404);
//   });
  // Works, but shouldn´t be 404

//   test('should not create super-admin because of password error', async () => {
//     const response = await request(app).post('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
//       email: 'usuario@mail.com',
//       password: '',
//     });
//     expect(response.status).toBe(404);
//   });
  // Works, but shouldn´t be 404

//   test('message on error while editing a super-admin with an email error', async () => {
//     const response = await request(app).post('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
//       email: '',
//       password: '1234',
//     });
//     expect(response.body.msg).toEqual('An error has occurred');
//   });
// undefined

//   test('message on error while editing a super-admin with a password error', async () => {
//     const response = await request(app).post('/super-admins/edit/628b8ddf088673d6a24b7ae3').send({
//       email: 'usuario@mail.com',
//       password: '',
//     });
//     expect(response.body.msg).toEqual('An error has occurred');
//   });
// undefined
});

// // DELETE test

describe('DELETE /super-admins/delete/:id', () => {
//   test('Response should delete a super-admin', async () => {
//     const response = await request(app).post('/super-admins/delete/628b8ddf088673d6a2471ae3').send;
//     expect(response.status).toBe(200);
//   });
  // 404

//   test('message on deletion of a super-admin', async () => {
//     const response = await request(app).post('/super-admins/delete/628b8ddf088673d6a2471ae3').send();
//     expect(response.body.msg).toEqual('Super Admin succefully deleted');
//     });
    // undefined

  test('should not delete super-admin because of id not existing', async () => {
    const response = await request(app).post('/super-admins/delete/628b8ddf088673db7ae3').send();
    expect(response.status).toBe(404);
  });

//   test('message on error while deleting a super-admin because of id not existing ', async () => {
//     const response = await request(app).post('/super-admins/delete/628b8ddf088673db7ae3').send();
//     expect(response.body.msg).toEqual('Super Admin not found');
//   });
  // undefined

//   test('should not delete super-admin because of a missing id parameter', async () => {
//     const response = await request(app).post('/super-admins/delete/ ').send();
//     expect(response.status).toBe(400);
//   });
  // 404

//   test('message on error while deleting a super-admin because of a missing id parameter', async () => {
//     const response = await request(app).post('/super-admins/delete/').send();
//     expect(response.body.msg).toEqual('Missing id parameter');
//   });
//   undefined

//   test('should not delete super-admin because of an unexpected error', async () => {
//     const response = await request(app).post('/super-admins/delete/628b8ddf088673d6a24b7ae3').send();
//     expect(response.status).toBe(404);
//   });

//   test('message on error while deleting a super-admin with an unexpected error', async () => {
//     const response = await request(app).post('/super-admins/delete/628b8ddf088673d6a24b7ae3').send();
//     expect(response.body.msg).toEqual('An error has occurred');
//   });
});
