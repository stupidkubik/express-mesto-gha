const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  LoginUser,
} = require('../controllers/users');

router.get('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), LoginUser);

module.exports = router;
