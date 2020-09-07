const app = require('./app');
const {
  getPortById,
  getUrlById,
  isNodeSenior,
  isNodeLeader,
  isAtLeastOneFineThanks,
} = require('./util/index');
const { checkNodes, sendNodeIsLeader, sendPing } = require('./axios');

const getAndCheckResponses = async (id) => {
  const responses = await checkNodes(id);
  if (isAtLeastOneFineThanks(responses)) {
    return true;
  }
  throw new Error('no one finethanks');
};

const runElection = async (id) => {
  let timeoutId;
  let timeoutId2;
  const setCheckNodesTimeout = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => reject('checkNodes timeout'), process.env.CHECK_PERIOD);
  });
  const setLeaderAnswerTimeout = new Promise((resolve, reject) => {
    timeoutId2 = setTimeout(() => reject('leaderAnswer timeout'), process.env.CHECK_PERIOD);
  })
  try {
    await Promise.race([setCheckNodesTimeout, () => getAndCheckResponses(id)]);
    
    
    await Promise.race([setLeaderAnswerTimeout, waitLeaderAnswer])
  } catch (e) {
    if (e === 'checkNodes timeout') {
      clearTimeout(timeoutId2);
      await sendNodeIsLeader(id);
    }
  }
};

  

const startElection = async (id) => {
    if (!isNodeSenior(id)) {
  
      
      }
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
