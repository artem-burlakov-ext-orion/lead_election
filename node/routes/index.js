const { Router } = require('express');
const pingMaster = require('../middlewares/index');


const router = Router();

router.get('/check', pingMaster)

module.exports = router;
