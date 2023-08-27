const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserAvatarById,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userID', getUserById);
router.patch('/me', updateUserById);
router.patch('/me/avatar', updateUserAvatarById);

module.exports = router;
