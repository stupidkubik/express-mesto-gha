const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {
  HTTP_STATUS_NOT_FOUND,
} = require('http2').constants;

const router = require('./routes');

dotenv.config();

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64eb3cfe834f022375095173',
  };
  next();
});
app.use(router);

app.use('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'page is not found' });
});

app.listen(PORT);
