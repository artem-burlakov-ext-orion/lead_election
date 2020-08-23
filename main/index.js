const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use(routes);


moveToCron(checkMaster);

app.listen(3000, () => {
  console.log('ELECTION IS RUNNING');
})

