const express = require('express');
const routes = require('./routes/index');
const moveToCron = require('./utils/cron');
const checkLeader = require('./axios');

const app = express();

app.use(routes);

startNodes();
moveToCron(checkLeader);

app.listen(3000, () => {
  console.log('ELECTION IS RUNNING');
})
