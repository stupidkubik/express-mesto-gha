const {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('http2').constants;

const error = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? 'На сервере произошла ошибка'
      : message,
  });

  next();
};

module.exports = error;

// когда пользователь пытается зарегистрироваться по уже существующему в базе email.
// Для этого вам пригодится 409

// Если при попытке авторизоваться присланный токен некорректен —
// возвращайте 401 статус-код
