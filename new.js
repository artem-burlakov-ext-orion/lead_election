const getConfig = require('./util/json');

const getUrls = async (config) => config.map((node) => `${node.ip}:${node.port}`);


const getSeniorNodeUrls = async (id) => {
  const config = await getConfig();
  const seniorNodeConfig = config.filter((node) => node.id < id);
  const urls = getUrls(seniorNodeConfig);
  return urls;
};

(async () => {
  const a = await getSeniorNodeUrls(3);
  console.log(a);
  return a
})();
