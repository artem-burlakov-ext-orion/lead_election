const {
  getSeniorNodeUrls,
  getPortById,
  isNodeSenior,
  isNotAtLeastOneFineThanks,
} = require('./util/index');
const { checkNodes, sendNodeIsLeader, checkLeader } = require('./axios');
const app = require('./app');

const startElection = async (id) => {
  try {
    if (!isNodeSenior(id)) {
      const seniorNodeUrls = await getSeniorNodeUrls(id);
      const responses = await checkNodes(seniorNodeUrls);
      if (isNotAtLeastOneFineThanks(responses)) {
        await sendNodeIsLeader(id);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const nodeStarter = async (id) => {
  app.locals.id = id;
  const port = await getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`));
  await startElection(id);
  // startCheckingLeader(id);
};

const startCheckingLeader = (id) => setInterval(() => checkLeader(id), process.env.CHECK_PERIOD);

module.exports = {
  nodeStarter,
  startElection,
};
