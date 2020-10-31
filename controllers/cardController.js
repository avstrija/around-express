const { checkIdValidity } = require('../helpers/checkIdValidity');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      }
      res.status(404).send({ message: 'Requested resource not found' });
    })
    .catch((err) => {
      checkIdValidity(req, res);
      res.status(500).send({ message: err.message });
    });
};

const likedBefore = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Requested resource not found' });
      }
      return card.likes.includes(req.user._id);
    })
    .catch((err) => {
      checkIdValidity(req, res);
      res.status(500).send({ message: err.message });
    });
};

const handleLike = (req, res) => {
  const method = likedBefore(req, res) ? { $pull: { likes: req.user._id } }
    : { $addToSet: { likes: req.user._id } };

  Card.findByIdAndUpdate(
    req.params.id,
    method,
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      checkIdValidity(req, res);
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getCards, createCard, deleteCard, handleLike,
};
