const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя не может быть пустым'],
    minlength: [2, 'Минимальная длина — 2 буквы'],
    maxlength: [30, 'Максимальная длина — 30 букв'],
  },
  about: {
    type: String,
    required: [true, 'Описание не может быть пустым'],
    minlength: [2, 'Минимальная длина — 2 буквы'],
    maxlength: [30, 'Максимальная длина — 30 букв'],
  },
  avatar: {
    type: String,
    required: [true, 'Аватар не может быть пустым'],
    validate: {
      validator(str) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(str);
      },
      message: 'Введите URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
