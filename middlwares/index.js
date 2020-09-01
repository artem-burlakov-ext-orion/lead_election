const { getUrlById } = require("../util");
const { sendPing } = require('../axios');

const setLeaderId = async (req, res, next) => {
  req.app.locals.leaderId = req.params.id;
  res.status(200);
  next();
};

const sendLeaderAnswer = (req, res, next) => {
  res.status(200);
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

const sendIAmFine = (req, res, next) => {
  res.status(200);
  res.send('FINETHANKS');
  next();
};

// const haltOnTimedout = (req, res, next) => {
//   if (!req.timedout) next();
// }

module.exports = {
  sendIAmFine,
  setLeaderId,
  sendLeaderAnswer,
  sendPingToLeader,
};
