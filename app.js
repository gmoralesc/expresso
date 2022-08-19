// import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';

import express from './expresso.js';

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.id = uuidv4();
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

app.get('/request', (req, res) => {
  res.json({
    id: req.id,
  });
});

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      error: 'Unauthorized',
    });
  } else {
    next();
  }
};

app.post('/users/login', auth, (req, res) => {
  res.json({
    success: true,
  });
});

app.post('/users', (req, res) => {
  const { body = {} } = req;

  res.status(201).json({
    data: body,
  });
});

app.get('/users', (req, res) => {
  const { query = {} } = req;

  res.json({
    data: [],
    meta: query,
  });
});

app.get('/users/:id', (req, res) => {
  const { params = {} } = req;
  const { id = '' } = params;

  res.json({
    data: {
      id,
    },
  });
});

app.get('/broken', (req, res) => {
  throw new Error('Unknown error');
});

app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => {
  const { message, status = 500 } = err;

  res.status(status).json({
    error: {
      message,
    },
  });
});

export default app;
