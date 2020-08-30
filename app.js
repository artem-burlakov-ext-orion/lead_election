require('dotenv').config();
const express = require('express');

const { sendIAmFine } = require('./middlwares/index');
const { setLeaderId } = require('./util/json');
const { startElection, startCheckingLeader } = require('./axios');
const { getPortById, setNodeStarted } = require('./util/index');



const app = express();

app.get('/ALIVE', sendIAmFine);

app.get('/IAMTHEKING/:id', setLeaderId);


const nodeStarter = (id) => {
  const port = getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`));
  setNodeStarted(id); // state changed  - brrrr!
  startElection();
  startCheckingLeader();
  
};

nodeStarter();


module.exports = nodeStarter;
