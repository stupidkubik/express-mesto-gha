const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;

const cardModel = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  return cardModel
    .create({ name, link, owner: req.user._id })
    .then((card) => cardModel.findById(card._id)
      .populate('owner')
      .then(((newCard) => res.status(HTTP_STATUS_CREATED).send(newCard)))
      .catch(() => res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Invalid Card ID' })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid Data' });
      }
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
    });
};

const getCards = (req, res) => cardModel.find({})
  .populate(['owner', 'likes'])
  .then((data) => res.status(HTTP_STATUS_OK).send(data))
  .catch(() => {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
  });

const deleteCardById = (req, res) => {
  // const { cardID } = req.params.cardId;s
  if (req.params.cardId.length === 24) {
    return cardModel
      .findByIdAndDelete(req.params.cardId)
      .then((data) => {
        if (data === null) {
          return res
            .status(HTTP_STATUS_NOT_FOUND)
            .send({ message: 'Card is not found' });
        }
        return res.status(HTTP_STATUS_OK).send({ message: 'Card is deleted' });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Invalid card ID' });
        }
        res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
      });
  } return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Invalid card ID' });
};

const putLikeById = (req, res) => {
  if (req.params.cardId.length === 24) {
    return cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
      .populate(['owner', 'likes'])
      .then((card) => res.status(HTTP_STATUS_OK).send(card))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(HTTP_STATUS_BAD_REQUEST).send({ error: err.message });
        }
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Card not found' });
      });
  } return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
};

const deleteLikeById = (req, res) => {
  if (req.params.cardId.length === 24) {
    return cardModel
      .findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
      .populate(['owner', 'likes'])
      .then((card) => res.status(HTTP_STATUS_OK).send(card))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.status(HTTP_STATUS_BAD_REQUEST).send({ error: err.message });
        }
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Card not found' });
      });
  } return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Server Error' });
};

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  putLikeById,
  deleteLikeById,
};
