const userRouter = require("./users");
const cardRouter = require("./cards");
const router = require("express").Router();

// const consoleLoggerMiddleware = require("../middlewares/consoleLogger");
// router.use(consoleLoggerMiddleware);

router.use("/users", userRouter);
router.use("/cards", cardRouter);

module.exports = router;
