const getConfig = require('./json');

const getPortById = async (id) => {
  const config = await getConfig();
  const nodeConfig = config.find((node) => node.id === id);
  return nodeConfig.port;
};

const getUrlById = async (id) => {
  const allNodesConfig = await getConfig();
  const config = allNodesConfig.find((node) => node.id === id);
  return `${config.ip}:${config.port}`;
};

const getUrls = (config) => {
  const urls = config.map((node) => `${node.ip}:${node.port}`);
  return urls;
};

const getSeniorNodeUrls = async (id) => {
  const config = await getConfig();
  const seniorNodeConfig = config.filter((node) => node.id < id);
  const urls = getUrls(seniorNodeConfig);
  return urls;
};

const getOtherNodeUrls = async (id) => {
  const config = await getConfig();
  const otherNodeConfig = config.filter((node) => node.id !== id);
  const urls = getUrls(otherNodeConfig);
  return urls;
};

const isNodeSenior = (id) => id === 1;

const isRejected = (res) => res.status === 'rejected';

const isDataValueFineThanks = (res) => res.status === 'fulfilled' && res.value.data === 'FINETHANKS';

const isNotAtLeastOneFineThanks = (responses) => responses
  .every((response) => isRejected(response) || !isDataValueFineThanks(response));

module.exports = {
  getPortById,
  getUrlById,
  getSeniorNodeUrls,
  getOtherNodeUrls,
  isNodeSenior,
  isNotAtLeastOneFineThanks,
};
