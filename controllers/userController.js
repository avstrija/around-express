const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ConflictError = require('../middleware/errors/ConflictError');

const SALT_ROUND = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

// some user
const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

// current user
const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, SALT_ROUND, (err, hash) => {
    User.findOne({ email })
      .then((oldUser) => {
        if (oldUser) {
          throw new ConflictError('User with this email address already exists');
        }
        return User.create({
          name, about, avatar, email, password: hash,
        })
          .then((user) => res.status(200).send({ data: user }));
      })
      .catch(next);
  });
};

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

const loginUser = (req, res, next) => {
  const { password, email } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateJWT({ _id: user._id });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      return res.status(200).send({email, token });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.body._id,
    { avatar: req.body.avatar },
    { new: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports = {
  getUsers, getUserById, getUserInfo, createUser, updateProfile, updateAvatar, loginUser,
};
