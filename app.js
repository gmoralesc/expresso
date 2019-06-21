// const express = require('express');
const bodyParser = require('body-parser');

const express = require('./expresso');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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

app.get('/users/:id', (req, res, next) => {
  const { id } = req.params;
  res.json({
    id,
  });
});

app.post('/users', (req, res, next) => {
  const { id } = req.body;
  res.json({
    id,
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
