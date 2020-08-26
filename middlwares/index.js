const httpContext = require('express-http-context');

const isIdValid = (id) => {

}


const sendIAmFine = (req, res, next) => {
  res.status(200);
  res.send('FINETHANKS');
  next();
};

const setTheKing = (req, res, next) => {
  const king = req.params.id;
  if (!isIdValid(id)) {
    
  }
  httpContext.set('king', Number(req.params.id));
  res.status(200);
  next();
};

module.exports = {
  sendIAmFine, 
  sendOk,
};
