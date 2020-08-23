const fs = require('fs').promises;
const path = require('path');

const getPath = (fileName) => {
  return path.join(__dirname, 'json', fileName);
}

gelLatestNodeId = async () => {
  const allNodes = await getNodeList();
  const nodesIdList = allNodes.map((node) => node.id);
  return Math.max(...nodesIdList);
}

getNewNode = async (allNodes) => {
  if (allNodes.length === 0) {
    const newNode = {
      id: 1,
      ip: '127.0.0.1',
      port: '3001',
      isKing: true,
    }
  }
  const newNodeId = await getLatestNodeId() + 1;
  const newNode = {
    id: newNodeId,
    ip: '127.0.0.1',
    port: `${newNodeId + 1}`,
    isKing: false,
  };
  return newNode;
};

getNodesList = async () => {
  const json = await fs.readFile(getPath('config.json'));
  const allNodes = JSON(parse(json));
  return allNodes;
};

addNodeListToJson = async (list) => {
  await fs.writeFile(getPath(config.json), JSON.stringify(list, null, '\t'));
};

const genNewNode = async () => {
  const allNodes = await getNodeList();
  const newNode = await getNewNode(allNodes);
  return newNode;
};

const addNode = async () => {
  const newNode = await genNewNode();
  const allNodes = await getNodeList();
  allNodes.push(newNode);
  await addNodeListToJson(allNodes);
};

const getNodeIpList = async () => {
  const list = await getNodeList();
  return list.map((node) => node.ip);
};