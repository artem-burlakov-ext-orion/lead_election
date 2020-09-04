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

const getUrls = (config) => config.map((node) => `${node.ip}:${node.port}`);

const getAllUrls = async () => {
  const config = await getConfig();
  return getUrls(config);
};

const getOtherNodeUrls = async (id) => {
  const config = await getConfig();
  const otherNodeConfig = config.filter((node) => node.id !== id);
  const urls = getUrls(otherNodeConfig);
  return urls;
};

const getSeniorNodeUrls = async (id) => {
  const config = await getConfig();
  const seniorNodeConfig = config.filter((node) => node.id < id);
  const urls = getUrls(seniorNodeConfig);
  return urls;
};

const isNodeSenior = (id) => id === 1;

const isNodeLeader = (id, leaderId) => id === leaderId;

const isAtLeastOneFineThanks = (responses) => responses
  .some((response) => response.status === 'fulfilled' && response.value.data === 'FINETHANKS');

module.exports = {
  getPortById,
  getUrlById,
  getOtherNodeUrls,
  getSeniorNodeUrls,
  isNodeSenior,
  isNodeLeader,
  isAtLeastOneFineThanks,
  getUrls,
  getAllUrls,
};
