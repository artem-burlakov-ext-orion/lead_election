const { Router } = require('express');
const { sendIAmFine, setTheKing } = require('../middlwares/index');

const router = Router();

router.get('/ALIVE', sendIAmFine);

router.get('/IAMTHEKING/:id', setTheKing);


module.exports = router;
