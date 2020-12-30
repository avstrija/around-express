const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validation = require('validator');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ValidationError = require('../middleware/errors/ValidationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validation.isURL(v, [{ allow_underscores: true }]),
      message: 'Please, add a valid image link',
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validation.isEmail(v),
      message: 'Please, enter a valid email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator: (v) => validation.isAlphanumeric(v),
      message: 'Password should not contain spaces',
    },
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ValidationError('Incorrect email or password');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
