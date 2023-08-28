const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');

const router = require('./routes');

dotenv.config();

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  });

const app = express();

app.disable('x-powered-by');
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64eb3cfe834f022375095173',
  };
  next();
});
app.use(router);

app.listen(PORT);
