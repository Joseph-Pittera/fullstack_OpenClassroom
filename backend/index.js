const express = require('express');
const app = express();
const productRouter = require('./app/routers/productRouter');
const userRouter = require('./app/routers/userRouter');
const mongooseConnexion = require('./models/connexion');
require('dotenv').config();

app.use(express.json());

// paramétrage du CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/api/stuff', productRouter);
app.use('/api/auth', userRouter);
app.use('/images', express.static('./images'));

mongooseConnexion();

module.exports = app;
