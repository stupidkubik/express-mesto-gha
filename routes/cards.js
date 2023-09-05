const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCardById,
  putLikeById,
  deleteLikeById,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
}), createCard);

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
}), deleteCardById);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
}), putLikeById);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
}), deleteLikeById);

module.exports = router;
