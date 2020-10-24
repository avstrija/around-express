const express = require('express');
const path = require('path');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter, cardRouter);

const { PORT = 3000 } = process.env;
app.listen(PORT);
