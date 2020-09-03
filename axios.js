const axios = require('axios');
const { getUrlById } = require('./util/index');

const checkNodes = async (urls) => {
  const axiosList = urls
    .map((url) => axios.get(`${url}/ALIVE`));
  const responses = await Promise.allSettled(axiosList);
  return responses;
};

const sendNodeIsLeader = async (id) => {
  const otherNodeUrls = await getOtherNodeUrls(id);
  const axiosList = otherNodeUrls
    .map((url) => axios.get(`${url}/IAMTHEKING/:${id}`));
    await Promise.all(axiosList);
};

// const checkLeader = async (id) => {
//   const leaderId = 
//   if (id !== leaderId) {
//     try {
//       const url = await getUrlById(leaderId);
//       await axios.get(`${url}/PING`);
//     } catch (e) {
//       if (e.code === 'ECONNREFUSED') {
//         const url = getUrlById(id);
//         await axios.get(`${url}/ERROR`)

        
//     }
//   }
// };



module.exports = {
  checkNodes,
  sendNodeIsLeader,
//  checkLeader,
};
