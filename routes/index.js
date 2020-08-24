const { Router } = require('express');
const { sendResponse } = require('../middlwares/index');

const router = Router();

router.get('/ALIVE', sendResponse)


module.exports = router;
