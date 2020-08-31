require('dotenv').config();
const express = require('express');

const startElection = require('./main');
const { getPortById } = require('./util/index');

const app = express();

const nodeStarter = async (id) => {
  const port = getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`));
  await startElection(id);
  startCheckingLeader();
  
};

nodeStarter();


module.exports = nodeStarter;
