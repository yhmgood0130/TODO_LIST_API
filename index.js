const express = require('express');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const todo = require('./routes/todo');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',todo);

app.listen(port);

module.exports = app;
