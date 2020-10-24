const express = require('express');
const { getCards, getCardById } = require('../controllers/cardController');

const router = express.Router();

router.get('/cards', (req, res) => {
  getCards(req, res);
});

router.get('/cards/:id', (req, res) => {
  getCardById(req, res);
});

module.exports = router;
