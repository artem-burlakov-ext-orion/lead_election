const { Router } = require('express');
const { sendIAmFine } = require('../middlwares/index');
const { setLeaderId } = require('../util/json');

const router = Router();

router.get('/ALIVE', sendIAmFine);

router.get('/IAMTHEKING/:id', setLeaderId);

module.exports = router;
