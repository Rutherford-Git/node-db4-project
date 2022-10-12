STEP 1
----------------------------------------
install all on these dependencies:
  "dependencies": {
    "eslint": "^8.25.0",
    "knex-cleaner": "^1.3.1",
    "nodemon": "^2.0.20"
  },
   "dependencies": {
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "helmet": "^6.0.0",
    "knex": "^2.3.0",
    "sqlite3": "^5.1.2"
  }

STEP 2
----------------------------------------
create a .env file 
give PORT= ? a value
create index.js
create api folder 
create server.js in api folder
create recipes folder
create recipes-router.js && middleware && model

STEP 3
----------------------------------------
in index.js{
    require('dotenv').config()

    const server = require('./api/server.js');

    const PORT = process.env.PORT || 9000;

    server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
    });
}

in server.js{
    const express = require('express');
    const helmet = require('helmet');
    const recipesRouter = require('./recipes/recipes-router');

    const server = express();

    server.use(helmet());
    server.use(express.json());
    server.use('/api/recipes', recipesRouter);

    server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    });
    });

    module.exports = server;
}

in recipes-router{
    const router = require('express').Router()

    router.use('*', (req, res, err, next) =>{
        res.json({ api: 'up' })
    })

    module.exports = router;
}