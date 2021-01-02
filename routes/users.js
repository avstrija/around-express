const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUsers, getUserById, getUserInfo, updateProfile, updateAvatar,
} = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp('^https?:\\/\\/(www\\.)?[^\\s~<>]+\\.[^\\s~<>]+#?')),
  }),
}),
updateAvatar);
router.get('/users/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  getUserById);

module.exports = router;
