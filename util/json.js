const fs = require('fs').promises;
require('dotenv').config();
const path = require('path');
const { writeFile } = require('fs');

const getConfigPath = (fileName) => {
  return path.join(__dirname, 'json', fileName);
};

const configPath = getConfigPath(process.env.CONFIG_FILE_NAME);

const getConfig = async () => {
  const json = await fs.readFile(configPath);
  const config = JSON(parse(json));
  return config;
};

const saveConfig = async (config) => {
  await writeFile(configPath, JSON.stringify(config, null, '\t'));
};

module.exports = {
  getConfig,
  saveConfig,
};
