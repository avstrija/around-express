const express = require('express');
const { getUsers, getUserById, createUser } = require('../controllers/userController');

const router = express.Router();

router.get('/users', (req, res) => {
  getUsers(req, res);
});

router.get('/users/:id', (req, res) => {
  getUserById(req, res);
});

router.post('/users', (req, res) => {
  createUser(req, res);
});


module.exports = router;
