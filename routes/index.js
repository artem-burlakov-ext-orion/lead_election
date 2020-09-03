const { Router } = require('express');

const {
  sendIAmFine,
  setLeaderId,
  sendLeaderAnswer,
  checkNodeIsSenior,
  startNewElection,
} = require('../middlwares/index');

const router = Router();

router.get('/ALIVE', checkNodeIsSenior, sendIAmFine, startNewElection);

router.get('/IAMTHEKING/:id', setLeaderId);

router.get('/PING', sendLeaderAnswer);

module.exports = router;
