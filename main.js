const app = require('./app');
const {
  getPortById,
  getUrlById,
  isNodeSenior,
  isNodeLeader,
  isAtLeastOneFineThanks,
} = require('./util/index');
const { checkNodes, sendNodeIsLeader, sendPing } = require('./axios');

const startElection = async (id) => {
  try {
    if (!isNodeSenior(id)) {
      const responses = await checkNodes(id);
      
      if (!isAtLeastOneFineThanks(responses)) {
        await sendNodeIsLeader(id);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const checkLeader = async (id) => {
  const { leaderId } = app.locals;
  if (!isNodeLeader(id, leaderId)) {
    try {
      const url = await getUrlById(leaderId);
      const response = await sendPing(url);
      console.log(response);
      app.locals.error = 0;
    } catch (e) {
      if (e.code === 'ECONNREFUSED') {
        if (app.locals.error < 4) {
          app.locals.error += 1;
          return;
        }
        await startElection(id);
      }
    }
  }
};

const startCheckingLeader = (id) => setInterval(() => checkLeader(id), process.env.CHECK_PERIOD);

const nodeStarter = async (id) => {
  app.locals.id = id;
  app.locals.error = 0;
  const port = await getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`));
  await startElection(id);
  startCheckingLeader(id);
};

module.exports = {
  nodeStarter,
  startElection,
};
