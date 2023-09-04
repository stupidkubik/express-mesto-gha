const router = require('express').Router();
const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;

const userRouter = require('./users');
const cardRouter = require('./cards');
const signupRouter = require('./signupRouter');
const signinRouter = require('./signinRouter');
const auth = require('../middlewares/auth');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'page is not found' });
});

module.exports = router;
