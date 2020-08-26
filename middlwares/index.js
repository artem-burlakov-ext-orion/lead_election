const httpContext = require('express-http-context');


const sendIAmFine = (req, res, next) => {
  res.status(200);
  res.send('FINETHANKS');
  next();
};

module.exports = {
  sendIAmFine, 
};
