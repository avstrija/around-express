const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cardController');

const router = express.Router();

router.get('/cards', getCards);
router.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().uri({ scheme: /https?:\/\/(www\.)?[^ ~<>]+\.[^ ~<>]+#?/ }),
    }),
  }),
  createCard);
router.delete('/cards/:id', celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .options({ allowUnknown: true }),
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}),
deleteCard);
router.patch('/cards/:id/likes', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().length(24).hex(),
  }),
}),
addLike);
router.delete('/cards/:id/likes', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().length(24).hex(),
  }),
}),
deleteLike);

module.exports = router;
