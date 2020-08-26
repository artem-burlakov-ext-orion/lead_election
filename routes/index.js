const { Router } = require('express');
const { sendIAmFine } = require('../middlwares/index');

const router = Router();

router.get('/ALIVE', sendIAmFine);




module.exports = router;
