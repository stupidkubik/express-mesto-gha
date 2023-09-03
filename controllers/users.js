const mongoose = require('mongoose');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} = require('http2').constants;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const userModel = require('../models/user');

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  return userModel
    .create({ name, about, avatar })
    .then((newUser) => res.status(HTTP_STATUS_CREATED).send(newUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const getUsers = (req, res, next) => userModel.find({})
  .then((data) => {
    if (!data) throw new Error('Server Error');
    res.status(HTTP_STATUS_OK).send(data);
  })
  .catch(next);

const getUserById = (req, res, next) => {
  if (!(req.params.userID.length === 24)) {
    throw new BadRequestError('Invalid user ID');
  }

  return userModel
    .findById(req.params.userID)
    .then((data) => {
      if (!data) throw new NotFoundError('User not found');
      return res.status(HTTP_STATUS_OK).send(data);
    })
    .catch(next);
};

const updateUserById = (req, res, next) => {
  const { name, about } = req.body;
  if (!req.user._id) throw new Error('Server Error');
  if (!(req.user._id.length === 24)) {
    throw new BadRequestError('Invalid user ID');
  }

  return userModel
    .findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('User not found'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

const updateUserAvatarById = (req, res, next) => {
  if (!req.user._id) throw new Error('Server Error');
  if (!(req.user._id.length === 24)) {
    throw new BadRequestError('Invalid user ID');
  }

  return userModel
    .findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('User not found'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
};
