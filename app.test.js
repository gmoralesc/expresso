import request from 'supertest';

import app from './app.js';

describe('API', () => {
  test('has a root endpoint', async () => {
    const response = await request(app).get('/');

    expect(response.status).toEqual(200);
  });

  test('handles unknown routes', async () => {
    const response = await request(app).get('/unknown');

    expect(response.status).toEqual(404);
    expect(JSON.parse(response.text)).toEqual({
      error: {
        message: 'Route Not Found',
      },
    });
  });

  test('supports JSON format as response', async () => {
    const response = await request(app).get('/');

    expect(JSON.parse(response.text)).toEqual({
      message: 'Welcome to the API',
    });
  });

  test('set a request id for each incoming request', async () => {
    const response = await request(app).get('/request');

    expect(JSON.parse(response.text)).toHaveProperty('id');
  });

  test('handle exceptions', async () => {
    const response = await request(app).get('/broken');

    expect(response.status).toEqual(500);
    expect(JSON.parse(response.text)).toEqual({
      error: {
        message: 'Unknown error',
      },
    });
  });
});

describe('Users', () => {
  test('can login with an Authorization token', async () => {
    const response = await request(app)
      .post('/users/login')
      .set('Authorization', 'token');

    expect(JSON.parse(response.text)).toEqual({
      success: true,
    });
  });

  test('cannot login without an Authorization token', async () => {
    const response = await request(app).post('/users/login');

    expect(response.status).toEqual(401);
    expect(JSON.parse(response.text)).toEqual({
      error: 'Unauthorized',
    });
  });

  test('can be created', async () => {
    const data = {
      name: 'Gustavo Morales',
      email: 'gustavo.morales@gmail.com',
    };

    const response = await request(app)
      .post('/users')
      .send(data)
      .set('Content-Type', 'application/json');

    expect(response.status).toEqual(201);
    expect(JSON.parse(response.text)).toEqual({
      data,
    });
  });

  test('can be listed with query params', async () => {
    const options = {
      offset: '0',
      limit: '10',
    };

    const response = await request(app).get(
      `/users?offset=${options.offset}&limit=${options.limit}`
    );

    expect(JSON.parse(response.text)).toEqual({
      data: [],
      meta: options,
    });
  });

  test('can be found by id param', async () => {
    const id = '123';

    const response = await request(app).get(`/users/${id}`);

    expect(JSON.parse(response.text)).toEqual({
      data: {
        id,
      },
    });
  });
});
