const {
  addNewNode,
} = require('../utils/index');

const addNode = async (req, res, next) => {
  try {
    await addNewNode();
    res.status(200);
    next();
  } catch (e) {
    next(e);
  }
};

const start = (url) => {
  
}

const startNode = async (req, res, next) => {
  const url = req.params.config;
  start(url);


}

module.exports = addNode;

