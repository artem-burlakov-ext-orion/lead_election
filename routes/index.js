const { Router } = require('express');

const {
  sendIAmFine,
  setLeaderId,
  sendLeaderAnswer,
  checkNodeIsSenior,
  startNewElection,
  isLeaderAnswerExist,
} = require('../middlwares/index');

const router = Router();

router.get('/ALIVE', checkNodeIsSenior, sendIAmFine, startNewElection);

router.post('/IAMTHEKING/:id', isLeaderAnswerExist, setLeaderId);

router.get('/PING', sendLeaderAnswer);

module.exports = router;
