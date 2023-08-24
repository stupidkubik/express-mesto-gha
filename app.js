const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const dotenv = require("dotenv").config();
// const userModel = require("./models/user");
// const userData = require("./data.json");

// const {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUserById,
//   deleteUserById,
// } = require("./controllers/users");

const { PORT = 3000, DB_URL = "mongodb://localhost:27017/practikum" } =
  process.env;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Mongoose is connected`);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// app.delete("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
