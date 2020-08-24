const fs = require('fs').promises;
const path = require('path');

const getConfigPath = (fileName) => {
  return path.join(__dirname, 'json', fileName);
};

const getConfig = async () => {
  const json = await fs.readFile(getPath('config.json'));
  const config = JSON(parse(json));
  return config;
};

module.exports = getConfig;

