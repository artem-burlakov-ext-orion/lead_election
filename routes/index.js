const { Router } = require('express');
const { sendOk } = require('../middlwares/index');

const router = Router();

router.get('/ALIVE', sendOk);


module.exports = router;
