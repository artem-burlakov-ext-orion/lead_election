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

const getSeniorNodeUrls = async (id) => {
  const config = await getConfig();
  const seniorNodeConfig = config.filter((node) => node.id < id);
  const urls = getUrls(seniorNodeConfig);
  return urls;
}

const isIdValid = (id) => {
  //isNumeric && <= config.length
  const config = await getConfig();
  return id <= config.length - 1;
};

module.exports = {
  getPortById,
  getUrlById,
  getSeniorNodeUrls,
};
