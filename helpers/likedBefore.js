const Card = require('../models/card');
const NotFoundError = require('../middleware/errors/NotFoundError');

const likedBefore = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        return card.likes.includes(req.user._id);
      }
      throw new NotFoundError('Requested resource not found.');
    })
    .catch(next);
};

module.exports = { likedBefore };
