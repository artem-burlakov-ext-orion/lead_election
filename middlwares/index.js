const { getUrlById } = require("../util");

const setLeaderId = async (req, res, next) => {
  req.app.locals.leaderId = req.params.id;
  res.status(200);
  next();
};

const sendLeaderId = (req, res, next) => {
  const leaderId = req.app.locals.leaderId;
  res.status(200);
  res.send({
    id: leaderId
  });
  next();
};

const sendLeaderAnswer = (req, res, next) => {
  res.status(200);
  next();
};

const sendPingToleader = (req, res, next) => {
  const id = ...,
  const url = getUrlById(id);
  const response = await sendPing(url);
  next();
}

const sendIAmFine = (req, res, next) => {
  res.status(200);
  res.send('FINETHANKS');
  next();
};

module.exports = {
  sendIAmFine,
  setLeaderId,
  sendLeaderAnswer 
};
