const { getConfig, saveConfig } = require('./json');

const getPortById = async (id) => {
  const config = await getConfig();
  return config.find((node) => node.id === id).port
};

const getUrlById = async (id) => {
  const allNodesConfig = await getConfig();
  const config = allNodesConfig.find((node) => node.id === id);
  return `${config.ip}: ${config.port}`;
}

const getUrls = (config) => {
  const urls = config.map((node) => `${node.ip}:${node.port}`);
  return urls;
};

const isNodeValidToSendAlive = (senderNodeId, nodeConfig) => {
  return nodeConfig.id < senderNodeId && nodeConfig.isStarted;
}

const getStartedNodeUrls = async (id) => {
  const config = await getConfig();
  const startedNodeConfig = config.filter((node) => isNodeValidToSendAlive(id, node));
  const urls = getUrls(startedNodeConfig);
  return urls;
}

const setNodeStarted = async (id) => {
  const config = await getConfig();
  config.find((node) => node.id === id).isStarted = true;
  await saveConfig(config);
};

const isIdValid = (id) => {
  //isNumeric && <= config.length
  const config = await getConfig();
  return id <= config.length - 1;
};

module.exports = {
  getPortById,
  getStartedNodeUrls,
  setNodeStarted,
  getUrlById,
};
