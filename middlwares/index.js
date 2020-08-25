const sendOk = (req, res, next) => {
  res.status(200);
  res.send('FINETHANKS');
};

module.exports = sendOk;
