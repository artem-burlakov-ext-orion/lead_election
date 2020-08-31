const { Router } = require('express');

const { sendIAmFine, setLeaderId, sendLeaderId, sendLeaderAnswer } = require('../middlwares/index');
const startElection = require('../main');


const router = Router();

router.get('/ALIVE', sendIAmFine);

router.get('/IAMTHEKING/:id', setLeaderId);

router.get('/CHECK', getLeaderId, sendPingToLeader);

router.get('/PING', sendLeaderAnswer);

router.get('/START', startElection);

module.exports = router;
