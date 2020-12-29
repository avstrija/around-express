const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/NotFoundError');
const ForbiddenError = require('../middleware/errors/ForbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Requested resource not found.');
      } else if (String(card.owner) !== req.user._id) {
        throw new ForbiddenError('This is not your post, you can\'t delete it');
      } else {
        Card.findByIdAndRemove(cardId)
          .then(() => {
            res.status(200).send({ message: 'The post was removed.' });
          });
      }
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, addLike, deleteLike,
};
