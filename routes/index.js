const { Router } = require('express');

const { 
  sendIAmFine,
  setLeaderId,
  sendLeaderAnswer,
  checkNodeIsSenior,
  startNewElection,
  addErrorCount
} = require('../middlwares/index');

//const startElection = require('../main');

const router = Router();

router.get('/ALIVE', checkNodeIsSenior, sendIAmFine, startNewElection);

router.get('/IAMTHEKING/:id', setLeaderId);

router.get('/PING', sendLeaderAnswer);

//router.get('/ERROR', addErrorCount);

//router.get('/START', startElection);

module.exports = router;
