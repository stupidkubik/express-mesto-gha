const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const router = require('./routes');
const ownerMiddleware = require('./middlewares/ownerLogger');

dotenv.config();

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ownerMiddleware);
app.use(router);

app.listen(PORT);
