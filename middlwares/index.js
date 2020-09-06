const { getUrlById, isNodeSenior } = require('../util/index');
const { sendPing, sendNodeIsLeader } = require('../axios');
const { startElection } = require('../main');

const setLeaderId = (req, res, next) => {
  req.app.locals.leaderId = req.params.id;
  console.log('-----------------');
  console.log('id: ', req.app.locals.id);
  console.log('leaderId: ', req.app.locals.leaderId);
  console.log('----------------');
  res.status(200);
  next();
};

const newSetLeaderId = new Promise((resolve, reject) => {
  
})


const sendLeaderAnswer = (req, res, next) => {
  res.status(200);
  res.send('Ok');
  next();
};

const sendPingToLeader = async (req, res, next) => {
  try {
    const leaderUrl = getUrlById(req.app.locals.leaderId);
    const response = await sendPing(leaderUrl);
    next();
  } catch (e) {
    next(e);
  }
};

const checkNodeIsSenior = async (req, res, next) => {
  const { id } = req.app.locals;
  if (!isNodeSenior(id)) {
    next();
  }
  req.app.locals.leaderId = id;
  await sendNodeIsLeader(id);
};

const sendIAmFine = (req, res, next) => {
  res.status(200);
  res.send('FINETHANKS');
  next();
};

const startNewElection = async (req, res, next) => {
  await startElection(req.app.locals.id);
  next();
};

module.exports = {
  sendIAmFine,
  setLeaderId,
  sendLeaderAnswer,
  sendPingToLeader,
  checkNodeIsSenior,
  startNewElection,
};
