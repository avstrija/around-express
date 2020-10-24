const path = require('path');
const getFileContent = require('../helpers/getFileContent');

const pathToData = path.join(__dirname, '..', 'data', 'users.json');

function getUsers(req, res) {
  return getFileContent(pathToData)
    .then((users) => {
      res.status(200).send(users);
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
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
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
}

module.exports = { getUsers, getUserById };
