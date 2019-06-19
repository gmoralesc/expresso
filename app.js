// const express = require('express');
const express = require('./expresso');

const app = express();

app.use((req, res, next) => {
  const id = 100;
  req.id = id;
  next();
});

app.get('/', (req, res) => res.send('Welcome API'));
app.get('/users', (req, res) => {
  res.json({
    message: 'User',
    id: req.id,
  });
});

app.use((req, res) => {
  res.statusCode = 404;
  res.json({
    message: 'Route Not Found',
  });
});

app.use((err, req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

module.exports = app;
