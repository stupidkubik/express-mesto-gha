const { HTTP_STATUS_OK, HTTP_STATUS_NOT_FOUND } = require('http2').constants;

const mongoose = require('mongoose');
const userModel = require('../models/user');

const getUsers = (req, res) => userModel.find({})
  .then((data) => res.status(HTTP_STATUS_OK).send(data))
  .catch((err) => {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  });

const getUserById = (req, res) => {
  const { userID } = req.params;
  return userModel
    .findById(userID)
    .then((data) => {
      if (data === null) {
        return res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: 'User not found' });
      }
      return res.status(HTTP_STATUS_OK).send(data);
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.CastError) {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Invalid ID' });
      }
      res.status(500).send({ message: 'Server Error' });
    });
};

// const updateUserById = (req, res) => {};

// const deleteUserById = (req, res) => {};

const createUser = (req, res) => {
  const { name, caption, avatar } = req.body;
  return userModel
    .create({ name, caption, avatar })
    .then((r) => res.status(201).send(r))
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.ValidationError) {
        res.status(400).send({ message: 'Invalid Data' });
      }
      res.status(500).send({ message: 'Server Error' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  // updateUserById,
  // deleteUserById,
  createUser,
};
