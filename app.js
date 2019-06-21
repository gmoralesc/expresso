// const express = require('express');
const bodyParser = require('body-parser');

const express = require('./expresso');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const auth = (req, res, next) => {
  req.id = 42;
  next();
};

app.use(auth, (req, res, next) => {
  if (!req.id) {
    next(new Error('No user provided'));
  } else {
    next();
  }
});

app.get('/', (req, res, next) => {
  res.json({
    message: 'Welcome API',
  });
});

app.get('/users', (req, res, next) => {
  const { id } = req;
  const { limit = 10, skip = 0 } = req.query;
  res.json({
    name: 'User',
    id,
    meta: {
      limit,
      skip,
    },
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
