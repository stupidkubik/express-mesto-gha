const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getSelf,
  getUserById,
  updateUserById,
  updateUserAvatarById,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getSelf);

router.get('/:userID', celebrate({
  params: Joi.object().keys({
    userID: Joi.string().hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserById);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // avatar: Joi.string().dataUri(),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
  }),
}), updateUserAvatarById);

module.exports = router;
