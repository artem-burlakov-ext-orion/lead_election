const axios = require('axios');
const { getUrlById } = require('./util/index');

const checkNodes = async (urls) => {
  const axiosList = urls
    .map((url) => axios.get(`${url}/ALIVE`));
  const responses = await Promise.all(axiosList);
  return responses;
};

const sendNodeIsLeader = async (urls, id) => {
  const axiosList = urls
    .map((url) => axios.get(`${url}/IAMTHEKING/:${id}`));
    await Promise.all(axiosList);
};

const  startCheckLeader = async (url) => {
  const response = await axios.get(`${url}/CHECK`);
  return response;
};



module.exports = {
  checkNodes,
  sendNodeIsLeader,
  getLeaderId,
};
