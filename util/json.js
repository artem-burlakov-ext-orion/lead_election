const fs = require('fs').promises;
require('dotenv').config();
const path = require('path');

const getJsonPath = (fileName) => path.join(__dirname, '..', 'json', fileName);

const getConfig = async () => {
  try {
    const configPath = getJsonPath(process.env.CONFIG_FILE_NAME);
    const json = await fs.readFile(configPath);
    const config = JSON.parse(json);
    return config;
  } catch (e) {
    console.error(e);
  }
};

module.exports = getConfig;
