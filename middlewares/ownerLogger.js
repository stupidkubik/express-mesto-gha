const ownerMiddleware = (req, res, next) => {
  req.user = {
    _id: '64eb3a369ba3243bd9a55ae3',
  };
  next();
};

module.exports = ownerMiddleware;
