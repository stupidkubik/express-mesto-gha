const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  // updateUserById,
  // deleteUserById,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/:userID', getUserById);
router.get('/', getUsers);

module.exports = router;