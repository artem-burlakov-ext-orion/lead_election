const { getSeniorNodeUrls, getUrlById } = require('./util/index');
const { checkNodes, sendNodeIsLeader, checkLeader } = require('./axios');

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

const startCheckingLeader = (id) => {
  console.log('ID: ', id);
  setInterval(() => checkLeader(id), process.env.CHECK_PERIOD);
};

module.exports = {
  startElection,
  startCheckingLeader,
};
