const axios = require('axios');
const { getStartedNodeUrls, getUrlById } = require('./util/index');
const { getLeaderIdFromJson } = require('./util/json');



const checkLeader = async () => {
  const id = await getLeaderIdFromJson();
  const url = await getUrlById(id);
    

}

const isAtLeastOneNodeAlive = (responses) => {
  const isAlive = responses.find((response) => response === 'FINETHANKS');
  return isAlive.length > 0;
};

const startElection = async (id) => {
  const urls = getStartedNodeUrls(id);
  const responses = await checkNodes(urls);
  if (!isAtLeastOneNodeAlive(responses)) {
    await sendNodeIsLeader(urls, id);
    return true;
  }
  

  


  
}

const sendNodeIsLeader = async (urls, id) => {
  const axiosList = urls
    .map((url) => axios.get(`${url}/IAMTHEKING/:${id}`));
    await Promise.all(axiosList);
};

const checkNodes = async (urls) => {
  const axiosList = urls
    .map((url) => axios.get(`${url}/ALIVE`));
  const responses = await Promise.all(axiosList);
  return responses;
};

module.exports = {
  startElection
};
