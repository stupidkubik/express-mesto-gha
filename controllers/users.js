const mongoose = require('mongoose');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;

const userModel = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return userModel
    .create({ name, about, avatar })
    .then((newUser) => res.status(HTTP_STATUS_CREATED).send(newUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const getUsers = (req, res) => userModel.find({})
  .then((data) => res.status(HTTP_STATUS_OK).send(data))
  .catch(() => {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
  });

const getUserById = (req, res) => {
  if (req.params.userID.length === 24) {
    return userModel
      .findById(req.params.userID)
      .orFail()
      .then((data) => res.status(HTTP_STATUS_OK).send(data))
      .catch((err) => {
        if (err instanceof mongoose.Error.DocumentNotFoundError) {
          return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'User not found' });
        } if (err instanceof mongoose.Error.CastError) {
          return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid Data' });
        } return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
      });
  } return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid user ID' });
};

const updateUserById = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    return userModel
      .findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
      .orFail()
      .then((user) => res.status(HTTP_STATUS_OK).send(user))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
        } if (err instanceof mongoose.Error.DocumentNotFoundError) {
          return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
      });
  } return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
};

const updateUserAvatarById = (req, res) => {
  if (req.user._id) {
    return userModel
      .findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
      .orFail()
      .then((user) => res.status(HTTP_STATUS_OK).send(user))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: err.message });
        } if (err instanceof mongoose.Error.DocumentNotFoundError) {
          return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'User not found' });
        }
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
      });
  } return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
};
