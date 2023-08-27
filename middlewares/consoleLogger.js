const consoleLoggerMiddleware = (req, res, next) => {
  console.log('request Body:', req.body);
  next();
};

module.exports = consoleLoggerMiddleware;
