const { getSeniorNodeUrls, getUrlById } = require('./util/index');
const { checkNodes, sendNodeIsLeader, sendPingToLeader } = require('./axios');

const startElection = async (id) => {
  const urls = getSeniorNodeUrls(id);
  const responses = await checkNodes(urls);
  if (!isAtLeastOneNodeAlive(responses)) {
    const nodeUrl = getUrlById(id);
    const allUrls = urls.push(nodeUrl);
    await sendNodeIsLeader(allUrls, id);
  }

};

const isAtLeastOneNodeAlive = (responses) => {
  const isAlive = responses.find((response) => response === 'FINETHANKS');
  return isAlive.length > 0;
};

const checkLeader = async (id) => {
  const url = getUrlById(id);
  const response = await sendPingToLeader(url);
}

module.exports = startElection;
