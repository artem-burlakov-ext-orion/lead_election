const getConfig = require('./json');

const getPortByid = async (id) => {
  const config = await getConfig();
  return config.find((node) => node.id === id).port
};

const getNodeUrls = async () => {
  const config = await getConfig();
  const urls = config.map((node) => `${node.ip}:${node.port}`);
  return urls;
}

module.export = {
  getPortByid,
  getNodeUrls
};
