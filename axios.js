const axios = require('axios');
const { getAllUrls, getSeniorNodeUrls } = require('./util/index');

const checkNodes = async (id) => {
  try {
    const seniorNodeUrls = await getSeniorNodeUrls(id);
    const axiosList = seniorNodeUrls
      .map((url) => axios.get(`${url}/ALIVE`));
    const responses = await Promise.allSettled(axiosList);
    return responses;
  } catch (e) {
    console.error(e);
  }
};

const sendNodeIsLeader = async (id) => {
  const urls = await getAllUrls();
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
