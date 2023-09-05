const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createUser,
} = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // avatar: Joi.string().uri(),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
    // email: Joi.string().required().email(),
    email: Joi.string().required().pattern(/^\S+@\S+\.\S+$/),
    password: Joi.string().required().min(2),
  }).unknown(true),
}), createUser);

module.exports = router;
