require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');

// const timeout = require('connect-timeout');
//const { haltOnTimedout } = require('./middlwares/index');

const app = express();

app.use(routes);

app.locals.leaderId = 1;

 // app.use(timeout(process.env.TIMEOUT));
// app.use(haltOnTimedout);

module.exports = app;
