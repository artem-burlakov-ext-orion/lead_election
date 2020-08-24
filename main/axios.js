const axios = require('axios');
const {
  getFollowerList,
  getNodeUrlList,
  getNodeList,
} = require('./utils/index');

const checkLeader = async () => {
  const list = getFollowerList();
  const followerUrlList = getNodeUrlList(list);
  const axiosList = followerUrlList.map((url) => axios.get(`${url}/check`));
  const responses = await Promise.all(axiosList);
  console.log(responses);
};

const startNodes = async () => {
  const list = await getNodeList();
  const axiosList = followerUrlList.map((url) => axios.get(`/start/${url}`));
  const responses = await Promise.all(axiosList);


}

module.exports = checkLeader;
