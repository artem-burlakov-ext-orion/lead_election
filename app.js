require('dotenv').config();
const express = require('express');

// const timeout = require('connect-timeout');

const { startElection, startCheckingLeader } = require('./main');
const { getPortById } = require('./util/index');
//const { haltOnTimedout } = require('./middlwares/index');

const app = express();

const leaderId = 1

 // app.use(timeout(process.env.TIMEOUT));
// app.use(haltOnTimedout);

const nodeStarter = async (id) => {
  const port = await getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`));
  

  //await startElection(id);
  startCheckingLeader(id);
};

module.exports = {
  leaderId,
  nodeStarter,
}
