require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');

const { startElection } = require('./axios');

const { getPortById, setNodeStarted } = require('./util/index');

const app = express();

app.use(routes);

app.get('/IAMTHEKING/:id', (req, res) => {
  app.locals.leaderId = req.params.id;
  res.status(200);
});

const nodeStarter = (id) => {
  const port = getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`));
  setNodeStarted(id); // state changed  - brrrr!
  startElection();
  
};

nodeStarter();


module.exports = nodeStarter;
