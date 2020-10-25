const path = require('path');
const getFileContent = require('../helpers/getFileContent');

const pathToData = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {
  return getFileContent(pathToData)
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

function getCardById(req, res) {
  return getFileContent(pathToData)
    .then((cards) => {
      const currCard = cards.find((card) => card._id === req.params.id);

      if (currCard) {
        res.status(200).send(currCard);
      }

      return res.status(404).send({ message: 'Requested resource not found' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = { getCards, getCardById };
