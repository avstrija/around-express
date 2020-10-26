const path = require('path');
const getFileContent = require('../helpers/getFileContent');

const pathToData = path.join(__dirname, '..', 'data', 'users.json');

function getUsers(req, res) {
  return getFileContent(pathToData)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.status(err.status).send({ message: err.message }));
}

function getUserById(req, res) {
  return getFileContent(pathToData)
    .then((users) => {
      const currUser = users.find((user) => user._id === req.params.id);

      if (currUser) {
        res.status(200).send(currUser);
      }

      return res.status(404).send({ message: 'User ID not found' });
    })
    .catch((err) => res.status(err.status).send({ message: err.message }));
}

module.exports = { getUsers, getUserById };
