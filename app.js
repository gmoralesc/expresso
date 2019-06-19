// const express = require('express');
const express = require('./expresso');

const app = express();

app.get('/', (req, res) => res.send('Welcome API'));
app.get('/users', (req, res) => res.send('Users list'));

app.use((req, res) => {
  res.statusCode = 404;
  res.send('Route Not Found');
});

module.exports = app;
