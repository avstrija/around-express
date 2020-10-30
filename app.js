const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
  // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server running at ${PORT}`));
  })
// eslint-disable-next-line no-console
  .catch((err) => console.log(`${err}: did not connect`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5f9b2dd2ccf56f19ccc34fc3',
  };

  next();
});
app.use('/', userRouter, cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
