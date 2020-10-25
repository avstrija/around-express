const express = require('express');
const path = require('path');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter, cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

const { PORT = 3000 } = process.env;
app.listen(PORT);
