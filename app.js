const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const router = require('./routes');

dotenv.config();
const userModel = require('./models/user');
const cardModel = require('./models/card');

// const {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUserById,
//   deleteUserById,
// } = require("./controllers/users");

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Mongoose is connected');
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

// app.delete("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
