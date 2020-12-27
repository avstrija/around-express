const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getCards, createCard, deleteCard, handleLike,
} = require('../controllers/cardController');

const router = express.Router();

router.get('/cards', getCards);
router.post('/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
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
    id: Joi.string().required().hex(),
  }),
}),
deleteCard);
router.patch('/cards/:id/likes', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required().hex(),
  }),
}),
handleLike);

module.exports = router;
