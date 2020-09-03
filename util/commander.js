require('dotenv').config();
const program = require('commander');

const nodeStarter = require('../main');

const argParser = () => {
  program
    .version('1.0.0')
    .description('start new node')
    .arguments('<id>')
    .action(async (id) => await nodeStarter(Number(id))) 
    .parse(process.argv);
};

module.exports = argParser;
