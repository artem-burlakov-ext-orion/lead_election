const { Router } = require('express');
const {
  pingMaster,
  addNode,
  startNode
} = require('../middlewares/index');

const router = Router();

router.get('/check', pingMaster);

router.get('/node', addNode);

router.get('/start/:config', startNode);

module.exports = router;
