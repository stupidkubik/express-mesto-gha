const router = require('express').Router();
const {
  HTTP_STATUS_NOT_FOUND,
} = require('http2').constants;

const userRouter = require('./users');
const cardRouter = require('./cards');

// const ownerMiddleware = require('../middlewares/ownerLogger');

// router.use(ownerMiddleware);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'page is not found' });
});

module.exports = router;
