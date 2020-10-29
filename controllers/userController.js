const path = require('path');
const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.status(err.status).send({ message: err.message }));
}

function getUserById(req, res) {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User ID not found' });
      }
      return res.status(200).send({data: user});
    })
    .catch((err) => res.status(err.status).send({ message: err.message }));
}

function createUser(req, res) {
 const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      res.status(err.status).send({ message: err.message })
    });
}

module.exports = { getUsers, getUserById, createUser };
