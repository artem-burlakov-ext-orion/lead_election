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
    if (!isNodeSenior(id)) {
      console.log('!!!!');
      const responses = await checkNodes(id);
      console.log('RRRR: ', responses);
      setTimeOutToCheckResponses(responses);

      if (!isAtLeastOneFineThanks(responses)) {

        await sendNodeIsLeader(id);
      }
    }
};

const checkResponses = (responses) => {
  if (!isAtLeastOneFineThanks(responses)) {
    await sendNodeIsLeader(id);
    return;
  }
  setTimeOutToLeaderAnswer();

}

const setTimeOutToCheckResponses = () => setTimeout(() => checkResponses(responses), process.env.CHECK_PERIOD);

const setTimeOutToLeaderAnswer = () => setTimeout(() => waitLeaderAnswer(responses), process.env.CHECK_PERIOD)

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
