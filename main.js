const app = require('./app');
const {
  getPortById,
  getUrlById,
  isNodeSenior,
  isNodeLeader,
  isAtLeastOneFineThanks,
} = require('./util/index');
const { checkNodes, sendNodeIsLeader, sendPing } = require('./axios');


const DELAY = process.env.CHECK_PERIOD;

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
      const url = await getUrlById(leaderId);
      const response = await sendPing(url);
      return response;
  }
};

const isLeaderAlive = (id, timeoutId) => {
  try {
    const response = await checkLeader(id);
    timeoutId.refresh();
    return true;
  } catch (e) {
    if (e.code === 'ECONNREFUSED') {

    }
    

  }
}

const nodeStarter = async (id) => {
  app.locals.id = id;
  app.locals.error = 0;
  const port = await getPortById(id);
  app.listen(port, () => console.log(`NODE RUNNING ON PORT ${port}`));
  await startElection(id);


  

  let timeoutId3;
  const setLeaderAliveTimeout = new Promise((resolve, reject) => {
    timeoutId3 = setTimeout(() => reject('leaderAlive timeout'), 4 * DELAY);
  });

  setInterval(() => Promise.race(setLeaderAliveTimeout, () => startCheckingLeader(id, timeoutId3)), DELAY);

};

module.exports = {
  nodeStarter,
  startElection,
};
