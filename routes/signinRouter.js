const router = require('express').Router();
const {
  LoginUser,
} = require('../controllers/users');

router.get('/', LoginUser);

module.exports = router;
