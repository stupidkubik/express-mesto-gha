const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

// const ownerMiddleware = require('../middlewares/ownerLogger');

// router.use(ownerMiddleware);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
