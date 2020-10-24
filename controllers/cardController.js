const path = require('path');
const getFileContent = require('../helpers/getFileContent');

const pathToData = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {
  return getFileContent(pathToData)
    .then((cards) => {
      res.status(200).send(cards);
    })
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
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
    // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
}

module.exports = { getCards, getCardById };
