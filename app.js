const express = require('express');
const cors = require('cors');

const routes = require('./routes/index');
const path = require('path')

const createApp = () => {
  const app = express();
  app.use(cors({origin:[ 'https://attheplace.vercel.app','http://localhost:3000'], allowedHeaders: ['Content-Type', 'Authorization']}));
app.use(express.json(), routes);
  app.use(express.static('public'));
  //app.use(express.urlencoded({ extended: true }));

  app.use('/images', express.static(path.join(__dirname, 'public/images')));

  app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).send(error.message || 'Internal Server Error')
  })

  return app;
};

module.exports = { createApp };
