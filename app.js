const express = require('express');
const routes = require('./routes/index');
const httpContext = require('express-http-context');

const { addNodeConfig, checkLeader, startElection } = require('./axios');

const { getPortById } = require('./util/index');

const app = express();

app.use(httpContext.middleware);
app.use(routes);

const nodeStarter = (id) => {
  const port = getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`))
};

nodeStarter();


module.exports = nodeStarter;
