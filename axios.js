const axios = require('axios');
const getStartedNodeUrls = require('./util/index');


const isAtLeastOneNodeAlive = (responses) => {
  const isAlive = responses.find((response) => response === 'FINETHANKS');
  return isAlive.length > 0;
};

const startElection = (id) => {
  const responses = await checkNodes(id);
  if (!isAtLeastOneNodeAlive(responses)) {
    await setNodeAsLeader(id);
  }
  


  
}

const setNodeAsLeader = async (id) => {
  const urls = getStartedNodeUrls(id);
  const axiosList = urls
    .map((url) => axios.get(`${url}/IAMTHEKING/:${id}`));
    await Promise.all(axiosList);
};

const checkNodes = async (id) => {
  const urls = getStartedNodeUrls(id);
  const axiosList = urls
    .map((url) => axios.get(`${url}/ALIVE`));
  const responses = await Promise.all(axiosList);
  return responses;
};

module.exports = {
  checkLeader,
  startElection
};
