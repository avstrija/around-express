const express = require('express');
// const User = require('../models/user');
const { getUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

router.get('/users', (req, res) => {
  getUsers(req, res);
});

router.get('/users/:id', (req, res) => {
  getUserById(req, res);
});

// router.post('/', (req, res) => {
//   const { name, about } = req.body; // get the name and description of the user

//   User.create({ name, about }).then(user => res.send({ data: user }))
//   // data not recorded, prompting an error
//   .catch(err => res.status(500).send({ message: err.message }));
// });


module.exports = router;
