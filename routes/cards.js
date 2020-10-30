const express = require('express');
const Card = require('../models/card');
const { getCards, createCard, deleteCard, handleLike } = require('../controllers/cardController');


const router = express.Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:id', deleteCard);
router.patch('/cards/:id/likes', handleLike);

module.exports = router;
