// const express = require('express');
const express = require('./expresso');

const app = express();

app.use((req, res, next) => {
  const id = 100;
  req.id = id;
  next();
});

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome API',
  });
});

app.get('/users', (req, res, next) => {
  res.json({
    message: 'User',
    id: req.id,
  });
});

app.use((req, res, next) => {
  res.statusCode = 404;
  res.json({
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => {
  const { message = '' } = err;
  res.status(500).json({
    message,
  });
});

module.exports = app;
