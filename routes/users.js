const router = require('express').Router();
const {
  getUsers,
  getSelf,
  getUserById,
  updateUserById,
  updateUserAvatarById,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getSelf);

router.get('/:userID', getUserById);
router.patch('/me', updateUserById);
router.patch('/me/avatar', updateUserAvatarById);

module.exports = router;
