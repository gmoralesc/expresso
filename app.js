// const express = require('express');
const express = require('./expresso');

const app = express();

app.get('/', (req, res) => res.end('Welcome API'));
// app.post('/', (req, res) => res.send('Hello World!'));
// app.post('/users', (req, res) => res.send('Hello World!'));
app.get('/users', (req, res) => res.end('Users list'));

module.exports = app;
