const fs = require('fs').promises;
require('dotenv').config();
const path = require('path');
const { writeFile } = require('fs');

const getJsonPath = (fileName) => {
  return path.join(__dirname, 'json', fileName);
};

const getConfig = async () => {
  try {
    const configPath = getJsonPath(process.env.CONFIG_FILE_NAME);
    const json = await fs.readFile(configPath);
    const config = JSON(parse(json));
    return config;
  } catch (e) {
    next(e);
  }
};

const saveConfig = async (config) => {
  try {
    const configPath = getJsonPath(process.env.CONFIG_FILE_NAME);
    await writeFile(configPath, JSON.stringify(config, null, '\t'));
  } catch (e) {
    next(e);
  }
};

const getLeaderIdFromJson = async () => {
  try {
    const leaderPath = getJsonPath('leader.json');
    const json = await fs.readFile(leaderPath);
    const id = JSON.parse(json);
    return id;
  } catch (e) {
    next(e);
  }
}

const setLeaderId = async (data) => {
  try {
    const leaderPath = getJsonPath('leader.json');
    await fs.writeFile(leaderPath, JSON.stringify(data, null, '\t'));
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getConfig,
  saveConfig,
  getLeaderIdFromJson,
  setLeaderId,
};
