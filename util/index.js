const { getConfig, saveConfig } = require('./json');

const getPortByid = async (id) => {
  const config = await getConfig();
  return config.find((node) => node.id === id).port
};

const getUrls = (config) => {
  const urls = config.map((node) => `${node.ip}:${node.port}`);
  return urls;
};

const isValid = (senderNodeId, nodeConfig) => {
  return nodeConfig.id < senderNodeId && nodeConfig.isStarted;
}

const getStartedNodeUrls = async (id) => {
  const config = await getConfig();
  const startedNodeConfig = config.filter((node) => isValid(id, node));
  const urls = getUrls(startedNodeConfig);
  return urls;
}

const setNodeStarted = async (id) => {
  const config = await getConfig();
  config.find((node) => node.id === id).isStarted = true;
  await saveConfig(config);
};

module.export = {
  getPortByid,
  getStartedNodeUrls
};
