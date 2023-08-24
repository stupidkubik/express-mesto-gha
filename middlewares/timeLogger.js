const timeLoggerMiddleware = (req, res, next) => {
  console.log("Current Date:", new Date(Date.now()).toString());
  next();
};

module.exports = timeLoggerMiddleware;
