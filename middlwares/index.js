const httpContext = require('express-http-context');
const { setLeaderIdToJson } = require('../util/json');

const setLeaderId = async (req, res, next) => {
  try {
    const data = { leaderId: req.params.id};
    await setLeaderIdToJson(data);
    res.status(200);
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

module.exports = {
  sendIAmFine,
  setLeaderId 
};
