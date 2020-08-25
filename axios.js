const axios = require('axios');
const getStartedNodeUrls = require('./util/index');

const checkLeader = () => {

}

const startElection = (id) => {
  const promises = await checkNodes(id);
}

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
