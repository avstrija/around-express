const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() =>
  app.listen(PORT, () => console.log(`Server running at ${PORT}`)))
.catch((err) => console.log(`${err}: did not connect`));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter, cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

const { PORT = 3000 } = process.env;
