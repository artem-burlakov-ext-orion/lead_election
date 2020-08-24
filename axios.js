const axios = require('axios');
const getNodeUrls = require('./util/index');

const checkLeader = () => {

}

const startElection = () => {

}

const addNodeConfig = () => {
  

}

const checkNodes = async () => {
  const urls = getNodeUrls();
  const axiosList = urls
    .map((url) => axios.get(`${url}/ALIVE`, {
      params: {
        senderUrl: }}));
  const responses = await Promise.all(axiosList);
  })
}

module.exports = {
  checkLeader,
  startElection
};
