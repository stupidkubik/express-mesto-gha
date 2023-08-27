const router = require('express').Router();
const {
  createCard,
  getCards,
  deleteCardById,
  putLikeById,
  deleteLikeById,
} = require('../controllers/cards');

router.post('/', createCard);
router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', putLikeById);
router.delete('/:cardId/likes', deleteLikeById);

module.exports = router;
