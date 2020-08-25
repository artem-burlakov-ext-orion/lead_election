require('dotenv').config();
const express = require('express');
const routes = require('./routes/index');
const httpContext = require('express-http-context');

const { checkNodes, checkLeader, startElection } = require('./axios');

const { getPortById } = require('./util/index');

const app = express();

app.use(httpContext.middleware);
app.use(routes);

const nodeStarter = (id) => {
  const port = getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`))
  startElection();
  val(() => startcheckNodes(id), process.env.CHECK_PERIOD); 
};

nodeStarter();


module.exports = nodeStarter;
