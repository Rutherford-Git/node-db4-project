const express = require('express');
const helmet = require('helmet');
const recipesRouter = require('./recipes/recipes-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/recipes', recipesRouter);

server.use('*', (req, res, err, next) =>{ //eslint-disable-line
    res.json({ api: 'up' })
})

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;