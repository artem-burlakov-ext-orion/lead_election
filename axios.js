const axios = require('axios');
const { getUrls, getSeniorNodeUrls } = require('./util/index');

const checkNodes = async (id) => {
  const seniorNodeUrls = await getSeniorNodeUrls(id);
  console.log('urls: ', seniorNodeUrls);
  const axiosList = seniorNodeUrls
    .map((url) => axios.get(`${url}/ALIVE`));
  const responses = await Promise.allSettled(axiosList);
  return responses;
};

const sendNodeIsLeader = async (id) => {
  const urls = await getUrls();
  const axiosList = urls
    .map((url) => axios.get(`${url}/IAMTHEKING/:${id}`));
  await Promise.all(axiosList);
};

const sendPing = async (url) => {
  const response = await axios.get(`${url}/PING`);
  return response;
};

module.exports = {
  checkNodes,
  sendNodeIsLeader,
  sendPing,
};
