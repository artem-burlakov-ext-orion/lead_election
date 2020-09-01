const axios = require('axios');
const { getUrlById } = require('./util/index');
const { leaderId, } = require('./app');

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

const checkLeader = async (id) => {
  console.log('CHECK');
  console.log(id);
  console.log(leaderId);
  if (id !== leaderId) {
    console.log('START PING');
    const url = getUrlById(leaderId);
    console.log(url);
    const response = await axios.get(`${url}/PING`);
    console.log(response);
    return response;
  }
};


module.exports = {
  checkNodes,
  sendNodeIsLeader,
  checkLeader,
};
