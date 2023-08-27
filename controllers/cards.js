const { HTTP_STATUS_OK, HTTP_STATUS_NOT_FOUND } = require('http2').constants;

const mongoose = require('mongoose');
const cardModel = require('../models/card');

const createCard = (req, res) => {
  const { name, link } = req.body;
  return cardModel
    .create({ name, link, owner: req.user._id })
    .then((r) => res.status(201).send(r))
    .catch((err) => {
      if (err instanceof mongoose.ValidationError) {
        res.status(400).send({ message: 'Invalid Data' });
      }
      res.status(500).send({ message: 'Server Error' });
    });
};

const getCards = (req, res) => cardModel.find({})
  .then((data) => res.status(HTTP_STATUS_OK).send(data))
  .catch((err) => {
    console.log(err);
    res.status(500).send({ message: 'Server Error' });
  });

const deleteCardById = (req, res) => {
  const { cardID } = req.params;
  return cardModel
    .findById(cardID)
    .then((data) => {
      if (data === null) {
        return res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: 'Card not found' });
      }
      return res.status(HTTP_STATUS_OK).send(data);
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Invalid ID' });
      }
      res.status(500).send({ message: 'Server Error' });
    });
};

const putLikeById = (req, res) => { };

const deleteLikeById = (req, res) => { };

module.exports = {
  createCard,
  getCards,
  deleteCardById,
  putLikeById,
  deleteLikeById,
};
