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
in .env file{
give PORT= ? a value
NODE_ENV=development
}
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

in .gitignore file{
 ...
 //in the bottom of the file
 .vscode
}

STEP 4
----------------------------------------
F5 to run debugger

STEP 5
----------------------------------------
create knexfile.js

in knexfile{
const sharedConfig = {
    client: 'sqlite3',
    migrations: { directory: './data/migration' },
    seeds: { directory: './data/seeds'},
    useNullAsDefault: true,
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
    }

module.exports = {
    development: {
        ...sharedConfig,
        connection: { filename: './data/cook_book.db3'},
        },

    testing: {
        ...sharedConfig,
        connection: { filename: './data/cook_book.test.db3'},
        },

    production: {

        }
}

STEP 6
----------------------------------------
create data folder
create db-config.js file

in db-config{
    const knex = require('knex');

    const config = require('../knexfile.js');

    const environment = process.env.NODE_ENV

    module.exports = knex(config.development[environment]);
}

STEP 7
----------------------------------------
npx knex migrate:make initial-migration

set functions to async

